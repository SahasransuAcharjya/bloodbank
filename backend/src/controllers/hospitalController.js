import * as requestService from "../services/requestService.js";
import * as hospitalService from "../services/hospitalService.js";
import * as inventoryService from "../services/inventoryService.js";

export async function getMe(req, res, next) {
  try {
    const userId = req.user.id;
    const hospital = await hospitalService.getHospitalById(userId);
    res.json(hospital);
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const updated = await hospitalService.updateHospitalProfile(userId, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function createRequest(req, res, next) {
  try {
    const hospitalId = req.user.id;
    const payload = { ...req.body, hospitalId };
    const request = await requestService.createRequest(payload);
    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
}

export async function listRequests(req, res, next) {
  try {
    const hospitalId = req.user.role === "HOSPITAL" ? req.user.id : null;
    const requests = await requestService.listRequests({ hospitalId });
    res.json(requests);
  } catch (err) {
    next(err);
  }
}

export async function updateRequestStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await requestService.updateRequestStatus(id, status);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function getDashboardStats(req, res, next) {
  try {
    const hospitalId = req.user.id;

    // Parallelize queries for performance
    const [inventoryStats, expiringUnits, pendingRequests, donorsToday, criticalLowCount] = await Promise.all([
      inventoryService.getInventoryStats(hospitalId),
      inventoryService.getExpiringUnits(hospitalId),
      requestService.listRequests({ status: "OPEN" }),
      inventoryService.getDonorsToday(hospitalId),
      inventoryService.getCriticalLowCount(hospitalId)
    ]);

    console.log("Dashboard Stats - Pending Requests Count:", pendingRequests.length);

    res.json({
      inventory: inventoryStats,
      expiringUnits,
      pendingRequests: pendingRequests.length,
      donorsToday,
      criticalLowCount
    });
  } catch (err) {
    next(err);
  }
}

export async function getInventory(req, res, next) {
  try {
    const hospitalId = req.user.id;
    const units = await inventoryService.getHospitalInventory(hospitalId);
    res.json(units);
  } catch (err) {
    next(err);
  }
}

export async function addBloodUnit(req, res, next) {
  try {
    const hospitalId = req.user.id;
    const unit = await inventoryService.addBloodUnit({ ...req.body, hospitalId });
    res.status(201).json(unit);
  } catch (err) {
    next(err);
  }
}

export async function updateUnitStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await inventoryService.updateUnitStatus(id, status);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}
