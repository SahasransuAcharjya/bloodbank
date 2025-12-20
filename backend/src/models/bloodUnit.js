import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const bloodUnitSchema = new Schema(
    {
        hospitalId: {
            type: Schema.Types.ObjectId,
            ref: "User", // Assuming Hospital is a User with role HOSPITAL
            required: true,
            index: true,
        },
        bloodType: {
            type: String,
            required: true,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            index: true,
        },
        volumeML: {
            type: Number,
            default: 450,
        },
        status: {
            type: String,
            enum: ["AVAILABLE", "RESERVED", "TRANSFUSED", "EXPIRED", "QUARANTINED"],
            default: "AVAILABLE",
            index: true,
        },
        collectedAt: {
            type: Date,
            default: Date.now,
        },
        expiryDate: {
            type: Date,
            required: true,
            index: true,
        },
        donorId: {
            type: Schema.Types.ObjectId,
            ref: "User", // Optional: Link to donor if known
        },
        donorName: {
            type: String,
            trim: true,
        },
        donorAge: {
            type: Number,
            min: 18,
            max: 65,
        },
        donationDate: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
);

// Compound index for efficient querying of available stock by type
bloodUnitSchema.index({ hospitalId: 1, status: 1, bloodType: 1 });

const BloodUnit = models.BloodUnit || model("BloodUnit", bloodUnitSchema);
export default BloodUnit;
