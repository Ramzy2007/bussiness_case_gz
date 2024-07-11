const express = require('express');
const path = require("path");
const http = require('http');
const logger = require("morgan");
const fs = require("fs");
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
// const swaggerUi = require("swagger-ui-express");
const { connectDb } = require("./db/connect");
const winstonLogger = require("./config/logger");
const cors = require('cors');
const { parse } = require("yaml");

const packageRoutes = require('./routes/route.package');
const deliveryRoutes = require('./routes/route.delivery');

const { sendErrorResponse, sendSuccessResponse } = require("./utils/responses");


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const swaggerDocument = parse(
  fs.readFileSync(path.join(__dirname, "./swagger.yaml"), "utf8")
);

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
//app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

//app.use('/api/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/package', packageRoutes);
app.use('/api/delivery', deliveryRoutes);

app.post('/api/ping/', (res, req) => {
  return sendErrorResponse(res, 'UNAUTHORIZED');
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('ping', () => {
    console.log('ok');
  });

  socket.on('getPackages', async () => {
    const packages = await Package.find();
    socket.emit('packages', packages);
  });

  socket.on('getPackage', async (id) => {
    const package = await Package.findById(id);
    socket.emit('package', package);
  });

  socket.on('addPackage', async (packageData) => {
    const newPackage = new Package(packageData);
    await newPackage.save();
    io.emit('packageAdded', newPackage);
  });

  socket.on('deletePackage', async (id) => {
    await Package.findByIdAndRemove(id);
    io.emit('packageDeleted', id);
  });

  socket.on('updatePackage', async (data) => {
    const { id, packageData } = data;
    const updatedPackage = await Package.findByIdAndUpdate(id, packageData, { new: true });
    io.emit('packageUpdated', updatedPackage);
  });

  socket.on('getDeliveries', async () => {
    const deliveries = await Delivery.find();
    socket.emit('deliveries', deliveries);
  });

  socket.on('getDelivery', async (id) => {
    const delivery = await Delivery.findById(id);
    socket.emit('delivery', delivery);
  });

  socket.on('addDelivery', async (deliveryData) => {
    const newDelivery = new Delivery(deliveryData);
    await newDelivery.save();
    io.emit('deliveryAdded', newDelivery);
  });

  socket.on('deleteDelivery', async (id) => {
    await Delivery.findByIdAndRemove(id);
    io.emit('deliveryDeleted', id);
  });

  socket.on('updateDelivery', async (data) => {
    const { id, deliveryData } = data;
    const updatedDelivery = await Delivery.findByIdAndUpdate(id, deliveryData, { new: true });
    io.emit('deliveryUpdated', updatedDelivery);
  });
});

app.use(function (req, res, next) {
  next(createError(404));
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
