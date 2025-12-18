import Inventory from "../models/inventory.js";

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
