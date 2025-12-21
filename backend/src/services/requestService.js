import BloodRequest from "../models/bloodRequest.js";

export async function createRequest(payload) {
  return BloodRequest.create(payload);
}

export async function listRequests({ hospitalId, status }) {
  const filter = {};
  // If hospitalId is provided, we might want to filter by it, 
  // but BloodRequest has 'requesterId' which is a User ID (Hospital).
  // Assuming hospitalId passed here is the User ID.
  if (hospitalId) filter.requesterId = hospitalId;
  if (status) filter.status = status;

  console.log("listRequests Filter:", filter);
  return BloodRequest.find(filter)
    .sort({ createdAt: -1 })
    .populate("requesterId", "name email phone");
}

export async function updateRequestStatus(id, status) {
  const allowedStatuses = ["OPEN", "IN_PROGRESS", "FULFILLED", "CANCELLED"];
  if (!allowedStatuses.includes(status)) {
    const err = new Error("Invalid status");
    err.status = 400;
    throw err;
  }

  const updated = await BloodRequest.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!updated) {
    const err = new Error("Request not found");
    err.status = 404;
    throw err;
  }
  return updated;
}

export async function countOpenRequests(hospitalId) {
  const filter = { status: "OPEN" };
  if (hospitalId) filter.requesterId = hospitalId;
  return BloodRequest.countDocuments(filter);
}
