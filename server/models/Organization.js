const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  timing: { type: String },
  totalQueueTickets: { type: Number, default: 0 },
  currentQueueNumber: { type: Number, default: 0 },
  address: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

module.exports = mongoose.model("Organization", OrganizationSchema);
