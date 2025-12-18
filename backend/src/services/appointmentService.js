import Appointment from "../models/appointment.js";
import User from "../models/user.js";

export async function createAppointment(payload) {
  const { donorId, centerId, date, timeSlot, notes } = payload;

  const donor = await User.findById(donorId);
  const center = await User.findById(centerId);
  if (!donor || !center) {
    const err = new Error("Donor or center not found");
    err.status = 404;
    throw err;
  }

  return Appointment.create({
    donorId,
    centerId,
    date,
    timeSlot,
    notes,
  });
}

export async function listAppointmentsForDonor(donorId) {
  return Appointment.find({ donorId }).sort({ date: -1 });
}

export async function listAppointmentsForCenter(centerId) {
  const filter = {};
  if (centerId) filter.centerId = centerId;
  return Appointment.find(filter).sort({ date: 1 });
}

export async function updateAppointmentStatus(id, status) {
  const allowed = ["PENDING", "CONFIRMED", "CHECKED_IN", "COMPLETED", "CANCELLED"];
  if (!allowed.includes(status)) {
    const err = new Error("Invalid status");
    err.status = 400;
    throw err;
  }

  const updated = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!updated) {
    const err = new Error("Appointment not found");
    err.status = 404;
    throw err;
  }

  // On COMPLETED, increment donor totalDonations and lastDonationDate
  if (status === "COMPLETED") {
    await User.findByIdAndUpdate(updated.donorId, {
      $inc: { totalDonations: 1 },
      lastDonationDate: new Date(),
    });
  }

  return updated;
}

export async function countCompletedAppointments() {
  return Appointment.countDocuments({ status: "COMPLETED" });
}
