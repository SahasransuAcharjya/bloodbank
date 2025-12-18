import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const appointmentSchema = new Schema(
  {
    donorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    centerId: {
      type: Schema.Types.ObjectId,
      ref: "User", // hospital/blood center
      required: true,
      index: true,
    },

    date: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // e.g. "10:00-11:00"

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CHECKED_IN", "COMPLETED", "CANCELLED"],
      default: "PENDING",
      index: true,
    },

    notes: { type: String },
  },
  { timestamps: true }
);

const Appointment =
  models.Appointment || model("Appointment", appointmentSchema);
export default Appointment;
