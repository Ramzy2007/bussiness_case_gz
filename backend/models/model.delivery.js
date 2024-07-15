const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  pickup_time: { type: Date, default: Date.now },
  start_time: { type: Date, default: null },
  end_time: { type: Date, default: null },
  location: {
    lat: { type: Number, required: true, },
    lng: { type: Number, required: true, },
  },
  status: {
    type: String,
    enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'],
    default: 'open'
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);