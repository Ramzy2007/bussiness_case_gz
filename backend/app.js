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
const WebSocket = require('ws');

const packageRoutes = require('./routes/route.package');
const deliveryRoutes = require('./routes/route.delivery');

const { sendErrorResponse, sendSuccessResponse } = require("./utils/responses");
const Delivery = require('./models/model.delivery'); // Ensure the Delivery model is imported
const Package = require('./models/model.package');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

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

// WebSocket connection
wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
      try {
          const data = JSON.parse(message);

          // Handle different events
          switch (data.event) {
              case 'location_changed':
                  await handleLocationChanged(data);
                  break;

              case 'status_changed':
                  await handleStatusChanged(data);
                  break;

              default:
                  console.error('Unknown event:', data.event);
                  break;
          }
      } catch (err) {
          console.error('Error processing message:', err);
          // Optionally send an error response back to the client
      }
  });
});

 // Utility function to broadcast updates
 function broadcast(data) {
  wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
      }
  });
}


handleLocationChanged = async (data) => {
  const { delivery_id, location } = data;

  const delivery = await Delivery.findById(delivery_id);
  if (!delivery) throw new Error('Delivery not found');

  delivery.location = location;
  await delivery.save(); // Persist changes

  broadcast({
      event: 'delivery_updated',
      data: delivery
  });
}

// Handle status change
handleStatusChanged = async (data) => {
  const { delivery_id, status } = data;
  const delivery = await Delivery.findById(delivery_id);
  if (!delivery) throw new Error('Delivery not found');

  const currentTime = new Date().toISOString();
  const validStatuses = ['picked-up', 'in-transit', 'delivered', 'failed'];

  if (!validStatuses.includes(status)) throw new Error('Invalid status');

  delivery.status = status;

  switch (status) {
      case 'picked-up':
          const package = await Package.findById(delivery.package);
          if (!package) throw new Error('Package not found');
          delivery.pickup_time = currentTime;
          package.active_delivery_id = delivery._id;
          await delivery.save(); 
          await package.save(); 
          break;
      case 'in-transit':
          delivery.start_time = currentTime;
          await delivery.save(); 
          break;
      case 'delivered':
      case 'failed':
          delivery.end_time = currentTime;
          await delivery.save(); 
          break;
  }
// Persist changes

  broadcast({
      event: 'delivery_updated',
      data: delivery
  });

}

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
