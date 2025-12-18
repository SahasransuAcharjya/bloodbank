// Small helpers to keep API responses consistent

export function ok(res, data = {}, status = 200) {
    return res.status(status).json({
      success: true,
      data,
    });
  }
  
  export function created(res, data = {}) {
    return ok(res, data, 201);
  }
  
  export function fail(res, message = "Something went wrong", status = 400) {
    return res.status(status).json({
      success: false,
      message,
    });
  }
  