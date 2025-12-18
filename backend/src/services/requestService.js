import Request from "../models/request.js";

export async function createRequest(payload) {
  return Request.create(payload);
}

export async function listRequests({ hospitalId }) {
  const filter = {};
  if (hospitalId) filter.hospitalId = hospitalId;
  return Request.find(filter).sort({ createdAt: -1 });
}

export async function updateRequestStatus(id, status) {
  const allowedStatuses = ["OPEN", "MATCHED", "FULFILLED", "CANCELLED"];
  if (!allowedStatuses.includes(status)) {
    const err = new Error("Invalid status");
    err.status = 400;
    throw err;
  }

  const updated = await Request.findByIdAndUpdate(
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

export async function countOpenRequests() {
  return Request.countDocuments({ status: "OPEN" });
}
