const Delivery = require('../models/model.delivery.js');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responses.js');

// For posting data into database 
const createDelivery = async (req, res) => {
    const delivery = new Delivery(req.body);
  try {
    const newDelivery = await delivery.save();
    return sendSuccessResponse(res,"DELIVERY_CREATED",newDelivery, 201);
  } catch (err) {
    return sendErrorResponse(res, 'VALIDATION_ERROR',{ message: err.message });
  }
}

// For getting all deliveries from database 
const getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        if (deliveries.length === 0) {
            return sendErrorResponse(res, 'DELIVERY_NOT_FOUND',{ message: "Delivery not Found." });
        }
        return sendSuccessResponse(res,"DELIVERY_FETCHED",deliveries, 200);
    } catch (error) {
        return sendErrorResponse(res, 'SERVER_ERROR',{ message: " Internal Server Error. " });
    }
}

// For updating data 
const getDelivery = async (req, res) => {
    try {
        const {id} = req.params;
        const deliveryExist = await Delivery.findOne({ _id: id })
        if (!deliveryExist) {
            return sendErrorResponse(res, 'DELIVERY_NOT_FOUND',{ message: "Delivery not Found." });
        }
        return sendSuccessResponse(res,"DELIVERY_FETCHED",deliveryExist, 200);
    } catch (error) {
        return sendErrorResponse(res, 'SERVER_ERROR',{ message: " Internal Server Error. " });
    }
}

// For updating data 
const updateDelivery = async (req, res) => {
    try {
        const {id} = req.params;
        const deliveryExist = await Delivery.findOne({ _id: id })
        if (!deliveryExist) {
            return sendErrorResponse(res, 'DELIVERY_NOT_FOUND',{ message: "Delivery not Found." });
        }
        const updateDelivery = await Delivery.findByIdAndUpdate(id, req.body, { new: true });
        return sendSuccessResponse(res,"DELIVERY_UPDATED",updateDelivery, 200);
    } catch (error) {
        return sendErrorResponse(res, 'SERVER_ERROR',{ message: " Internal Server Error. " });
    }
}

const updateDeliveryBySocket = async (data) => {
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

    // take current date time if picked
    if (status='picked-up') {
        delivery.pickup_time = new Date();
    }

    if (status='in-transit') {
        delivery.start_time = new Date();
    }

    if (status='delivered') {
        delivery.end_time = new Date();
    }

    delivery.status = status;
    await delivery.save();

    // Broadcast the updated status to all connected clients
    io.emit('deliveryUpdated', { id, status });
  } catch (error) {
    socket.emit('error', { error: error.message });
  }
}

// For deleting data from database 
const deleteDelivery = async (req, res) => {
    try {
        const {id} = req.params;
        const deliveryExist = await Delivery.findOne({ _id: id })
        if (!deliveryExist) {
            return sendErrorResponse(res, 'DELIVERY_NOT_FOUND',{ message: "Delivery not Found." });
        }
        await Delivery.findByIdAndDelete(id);
        return sendSuccessResponse(res,"DELIVERY_DELETED", { message: "Delivery deleted Successfully." }, 200);
    } catch (error) {
        return sendErrorResponse(res, 'SERVER_ERROR',{ message: " Internal Server Error. " });
    }
}

module.exports = {
    getDelivery,
    getDeliveries,
    createDelivery,
    updateDelivery,
    deleteDelivery,
  };