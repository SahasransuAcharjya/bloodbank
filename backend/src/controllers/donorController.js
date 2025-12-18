import * as donorService from "../services/donorService.js";

export async function getMe(req, res, next) {
  try {
    const userId = req.user.id;
    const donor = await donorService.getDonorById(userId);
    res.json(donor);
  } catch (err) {
    next(err);
  }
}

export async function getDonationHistory(req, res, next) {
  try {
    const userId = req.user.id;
    const history = await donorService.getDonationHistory(userId);
    res.json(history);
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const updated = await donorService.updateDonorProfile(userId, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function listDonors(req, res, next) {
  try {
    const { bloodType, city } = req.query;
    const donors = await donorService.findDonors({ bloodType, city });
    res.json(donors);
  } catch (err) {
    next(err);
  }
}
