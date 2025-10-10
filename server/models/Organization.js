import mongoose from "mongoose";

const TimingSchema = new mongoose.Schema({
  opening: { type: String, required: true },
  closing: { type: String, required: true },
});

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  orgType: {
    type: String,
    enum: ["Bank", "Healthcare", "Government", "Education", "Retail", "Other"],
    required: true,
  },
  city: { type: String, required: true },
  country: { type: String, required: true },
  fullAddress: { type: String, required: true },
  days: [{ type: String }],
  timing: { type: TimingSchema, required: true },
  totalQueueTickets: { type: Number, default: 0 },
  currentQueueNumber: { type: Number, default: 0 },
  logo: { type: String },
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

export default mongoose.model("Organization", OrganizationSchema);
