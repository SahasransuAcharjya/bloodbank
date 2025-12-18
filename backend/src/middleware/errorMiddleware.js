// Central error-handling middleware
export function errorHandler(err, _req, res, _next) {
    console.error("API Error:", err);
  
    const status = err.statusCode || err.status || 400;
    const message = err.message || "Something went wrong";
  
    res.status(status).json({
      message,
    });
  }
  