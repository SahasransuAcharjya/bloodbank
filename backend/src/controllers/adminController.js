import * as donorService from "../services/donorService.js";
import * as requestService from "../services/requestService.js";
import * as appointmentService from "../services/appointmentService.js";
import * as inventoryService from "../services/inventoryService.js";

export async function getStats(_req, res, next) {
  try {
    const [donorCount, totalDonations, openRequests, completedAppointments] =
      await Promise.all([
        donorService.countDonors(),
        donorService.countTotalDonations(),
        requestService.countOpenRequests(),
        appointmentService.countCompletedAppointments(),
      ]);

    res.json({
      donorCount,
      totalDonations,
      openRequests,
      completedAppointments,
    });
  } catch (err) {
    next(err);
  }
}

export async function getInventory(req, res, next) {
  try {
    const { city } = req.query;
    const inventory = await inventoryService.getInventorySummary({ city });
    res.json(inventory);
  } catch (err) {
    next(err);
  }
}

export async function updateInventory(req, res, next) {
  try {
    const updated = await inventoryService.updateInventory(req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}
