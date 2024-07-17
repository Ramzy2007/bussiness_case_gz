const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    description: { type: String, default: null },
    weight: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true },
    from_name: { type: String, required: true },
    from_address: { type: String, required: true },
    from_location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },
    to_name: { type: String, required: true },
    to_address: { type: String, required: true },
    to_location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },
    active_delivery_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Delivery",
        default: null,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Package", packageSchema);
