import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const inventorySchema = new Schema(
  {
    centerId: {
      type: Schema.Types.ObjectId,
      ref: "User", // hospital/blood bank
      required: true,
      index: true,
    },

    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      index: true,
    },

    unitsAvailable: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },

    city: { type: String, index: true },
  },
  { timestamps: true }
);

inventorySchema.index({ centerId: 1, bloodType: 1 }, { unique: true });

const Inventory =
  models.Inventory || model("Inventory", inventorySchema);
export default Inventory;
