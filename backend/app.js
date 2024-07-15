const express = require('express');
const path = require("path");
const http = require('http');
const logger = require("morgan");
const fs = require("fs");
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const { connectDb } = require("./db/connect");
const winstonLogger = require("./config/logger");
const cors = require('cors');

const packageRoutes = require('./routes/route.package');
const deliveryRoutes = require('./routes/route.delivery');

const { sendErrorResponse, sendSuccessResponse } = require("./utils/responses");
const Delivery = require('./models/model.delivery'); // Ensure the Delivery model is imported

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      "*",
      "http://localhost:3001",
      "http://localhost:4200",
      "http://localhost:8080"
    ],
    credentials: true
  },
});

// Initialize DB
connectDb().catch(console.error);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  origin: '*',
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

app.use('/api/package', packageRoutes);
app.use('/api/delivery', deliveryRoutes);

app.post('/api/ping/', (req, res) => {
  return sendErrorResponse(res, 'UNAUTHORIZED');
});

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('updateDelivery', async (data) => {
    try {
      const { id, status } = data;

      // Validate the status
      const validStatuses = ['open', 'picked-up', 'in-transit', 'delivered', 'failed'];
      if (!validStatuses.includes(status)) {
        throw new Error('Invalid status');
      }

      // Update the delivery status in the database
      const delivery = await Delivery.findById(id);
      if (!delivery) {
        throw new Error('Delivery not found');
      }

      delivery.status = status;
      await delivery.save();

      // Broadcast the updated status to all connected clients
      io.emit('deliveryUpdated', { id, status });
    } catch (error) {
      socket.emit('error', { error: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  winstonLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  if (err.status === 401) {
    return sendErrorResponse(res, 'UNAUTHORIZED');
  } else if (err.status === 403) {
    return sendErrorResponse(res, 'FORBIDDEN');
  }

  return sendErrorResponse(res, 'SERVER_ERROR');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
