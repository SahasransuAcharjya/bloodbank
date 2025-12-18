import User from "../models/user.js";

export async function getHospitalById(id) {
    const hospital = await User.findById(id).select("-passwordHash");
    if (!hospital) {
        const err = new Error("Hospital not found");
        err.status = 404;
        throw err;
    }
    return hospital;
}

export async function updateHospitalProfile(hospitalId, data) {
    const allowed = ["name", "phone", "city", "state", "address"];
    const update = {};
    for (const key of allowed) {
        if (data[key] !== undefined) update[key] = data[key];
    }

    const updated = await User.findByIdAndUpdate(hospitalId, update, {
        new: true,
    }).select("-passwordHash");

    if (!updated) {
        const err = new Error("Hospital not found");
        err.status = 404;
        throw err;
    }
    return updated;
}
