import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  number: { type: Number, required: true },
  status: {
    type: String,
    enum: ["waiting", "serving", "completed"],
    default: "waiting",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Token", tokenSchema);
