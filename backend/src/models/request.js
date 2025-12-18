import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const requestSchema = new Schema(
  {
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      index: true,
    },

    units: { type: Number, default: 1, min: 1 },

    urgency: {
      type: String,
      enum: ["NORMAL", "URGENT", "CRITICAL"],
      default: "NORMAL",
      index: true,
    },

    city: { type: String, index: true },
    note: { type: String },

    status: {
      type: String,
      enum: ["OPEN", "MATCHED", "FULFILLED", "CANCELLED"],
      default: "OPEN",
      index: true,
    },

    matchedDonorIds: [
      { type: Schema.Types.ObjectId, ref: "User" }
    ],
  },
  { timestamps: true }
);

const Request = models.Request || model("Request", requestSchema);
export default Request;
