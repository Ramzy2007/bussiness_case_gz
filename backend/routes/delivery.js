const express = require('express');
const Delivery = require('../models/delivery');

const router = express.Router();

// Get all deliveries
router.get('', async (req, res) => {
    const deliveries = await Delivery.find();
    res.json(deliveries);
});

// Get a single delivery by ID
router.get('/:id', async (req, res) => {
    const delivery = await Delivery.findById(req.params.id);
    res.json(delivery);
});

// Create a new delivery
router.post('', async (req, res) => {
    const delivery = new Delivery(req.body);
    await delivery.save();
    res.json(delivery);
});

// Update a delivery by ID
router.put('/:id', async (req, res) => {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(delivery);
});

// Delete a delivery by ID
router.delete('/:id', async (req, res) => {
    await Delivery.findByIdAndRemove(req.params.id);
    res.json({ message: 'Delivery deleted' });
});

module.exports = router;
