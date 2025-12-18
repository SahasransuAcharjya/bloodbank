import User from "../models/user.js";
import Appointment from "../models/appointment.js";

export async function getDonorById(id) {
  const donor = await User.findById(id).select("-passwordHash");
  if (!donor) {
    const err = new Error("Donor not found");
    err.status = 404;
    throw err;
  }
  return donor;
}

export async function getDonationHistory(donorId) {
  // Simple version: completed appointments are treated as donations
  const history = await Appointment.find({
    donorId,
    status: "COMPLETED",
  }).sort({ date: -1 });
  return history;
}

export async function updateDonorProfile(donorId, data) {
  const allowed = ["name", "phone", "city", "state", "address", "bloodType"];
  const update = {};
  for (const key of allowed) {
    if (data[key] !== undefined) update[key] = data[key];
  }

  const updated = await User.findByIdAndUpdate(donorId, update, {
    new: true,
  }).select("-passwordHash");

  if (!updated) {
    const err = new Error("Donor not found");
    err.status = 404;
    throw err;
  }
  return updated;
}

export async function findDonors({ bloodType, city }) {
  const query = { role: "DONOR", isActive: true };
  if (bloodType) query.bloodType = bloodType;
  if (city) query.city = city;

  return User.find(query).select("name bloodType city lastDonationDate totalDonations");
}

export async function countDonors() {
  return User.countDocuments({ role: "DONOR" });
}

export async function countTotalDonations() {
  const donors = await User.aggregate([
    { $match: { role: "DONOR" } },
    { $group: { _id: null, total: { $sum: "$totalDonations" } } },
  ]);
  return donors[0]?.total || 0;
}
