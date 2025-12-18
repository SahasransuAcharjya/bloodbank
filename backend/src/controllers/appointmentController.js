import * as appointmentService from "../services/appointmentService.js";

export async function createAppointment(req, res, next) {
  try {
    const donorId = req.user.id;
    const payload = { ...req.body, donorId };
    const appointment = await appointmentService.createAppointment(payload);
    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
}

export async function listMyAppointments(req, res, next) {
  try {
    const donorId = req.user.id;
    const items = await appointmentService.listAppointmentsForDonor(donorId);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function listCenterAppointments(req, res, next) {
  try {
    const { centerId } = req.query;
    const items = await appointmentService.listAppointmentsForCenter(centerId);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function updateAppointmentStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await appointmentService.updateAppointmentStatus(id, status);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}
