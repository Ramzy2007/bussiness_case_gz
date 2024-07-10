const mongoose = require('mongoose');
  
const packageSchema = new mongoose.Schema({
    description: { type: String, default: null },
    weight: { type: Number, default: null },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
    depth: { type: Number, default: null },
    from_name: { type: String, default: null },
    from_address: { type: String, default: null },
    from_location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },
    to_name: { type: String, default: null },
    to_address: { type: String, default: null },
    to_location: {
        lat: { type: Number, default: null },
        lng: { type: Number, default: null },
      },
  });

module.exports = mongoose.model('Package', packageSchema);