import * as requestService from "../services/requestService.js";
import * as hospitalService from "../services/hospitalService.js";

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
