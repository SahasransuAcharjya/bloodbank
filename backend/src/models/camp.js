import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const campSchema = new Schema(
    {
        organizerName: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true }, // e.g., "City Center Blood Drive"
        date: { type: Date, required: true },
        startTime: { type: String, required: true }, // e.g., "09:00 AM"
        endTime: { type: String, required: true },   // e.g., "05:00 PM"
        location: {
            city: { type: String, required: true },
            state: { type: String, required: true },
            address: { type: String, required: true },
            coordinates: {
                type: [Number],
                index: "2dsphere",
            },
        },
        targetUnits: { type: Number, default: 100 },
        registeredDonors: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        description: { type: String },
        contactPhone: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Camp = models.Camp || model("Camp", campSchema);
export default Camp;
