const express = require('express');
const { deleteDelivery, updateDelivery, createDelivery, getDelivery, getDeliveries } = require('../controllers/delivery.controller.js');

const router = express.Router();

// Get all Deliverys
router.get('', getDeliveries);

// Get a single Delivery by ID
router.get('/:id', getDelivery);

// Create a new Delivery
router.post('', createDelivery);

// Update a Delivery by ID
router.put('/:id', updateDelivery);

// Delete a Delivery by ID
router.delete('/:id', deleteDelivery);

module.exports = router;
