import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },

    role: {
      type: String,
      enum: ["DONOR", "HOSPITAL", "ADMIN"],
      default: "DONOR",
      index: true,
    },

    // Donor-specific
    bloodType: {
      type: String,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
        null,
      ],
      default: null,
      index: true,
    },
    lastDonationDate: { type: Date },

    // Shared contact/location
    phone: { type: String },
    city: { type: String, index: true },
    state: { type: String },
    address: { type: String },

    // Meta
    totalDonations: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
