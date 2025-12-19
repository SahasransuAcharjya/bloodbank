import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const bloodRequestSchema = new Schema(
    {
        requesterId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        patientName: { type: String, required: true, trim: true },
        hospitalName: { type: String, required: true, trim: true },
        bloodType: {
            type: String,
            required: true,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        },
        unitsRequired: { type: Number, required: true, min: 1 },
        urgency: {
            type: String,
            enum: ["EMERGENCY", "STANDARD"],
            default: "STANDARD",
            required: true,
        },
        status: {
            type: String,
            enum: ["OPEN", "IN_PROGRESS", "FULFILLED", "CANCELLED"],
            default: "OPEN",
            index: true,
        },
        location: {
            city: { type: String, required: true },
            state: { type: String, required: true },
            address: { type: String },
            // GeoJSON point for map integration later
            coordinates: {
                type: [Number], // [longitude, latitude]
                index: "2dsphere",
            },
        },
        deadline: { type: Date },
        contactPhone: { type: String, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

const BloodRequest = models.BloodRequest || model("BloodRequest", bloodRequestSchema);
export default BloodRequest;
