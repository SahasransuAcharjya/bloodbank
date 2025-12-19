import mongoose from "mongoose";
import Inventory from "../models/inventory.js";
import BloodUnit from "../models/bloodUnit.js";

export async function getInventorySummary({ city }) {
  const filter = {};
  if (city) filter.city = city;

  // group by bloodType and center
  return Inventory.find(filter).sort({ bloodType: 1 });
}

export async function updateInventory({ centerId, bloodType, unitsAvailable, city }) {
  if (!centerId || !bloodType) {
    const err = new Error("centerId and bloodType are required");
    err.status = 400;
    throw err;
  }

  const doc = await Inventory.findOneAndUpdate(
    { centerId, bloodType },
    {
      centerId,
      bloodType,
      unitsAvailable,
      city,
      lastUpdated: new Date(),
    },
    { new: true, upsert: true }
  );

  return doc;
}

// --- Blood Unit (Individual Bag) Operations ---

export async function addBloodUnit(data) {
  const unit = new BloodUnit(data);
  await unit.save();
  return unit;
}

export async function getHospitalInventory(hospitalId) {
  // Get all available units
  const units = await BloodUnit.find({
    hospitalId,
    status: "AVAILABLE"
  }).sort({ expiryDate: 1 });

  return units;
}

export async function getExpiringUnits(hospitalId, daysThreshold = 2) {
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() + daysThreshold);

  return BloodUnit.find({
    hospitalId,
    status: "AVAILABLE",
    expiryDate: { $lte: thresholdDate }
  }).sort({ expiryDate: 1 });
}

export async function updateUnitStatus(unitId, status) {
  return BloodUnit.findByIdAndUpdate(
    unitId,
    { status },
    { new: true }
  );
}

export async function getInventoryStats(hospitalId) {
  // Aggregate counts by blood type
  const stats = await BloodUnit.aggregate([
    { $match: { hospitalId: new mongoose.Types.ObjectId(hospitalId), status: "AVAILABLE" } },
    { $group: { _id: "$bloodType", count: { $sum: 1 } } }
  ]);

  // Convert to object for easier frontend consumption
  const result = {};
  stats.forEach(item => {
    result[item._id] = item.count;
  });
  return result;
}
