// ============================================
// Error Handling Middleware
// ============================================
// Catches all errors thrown in route handlers and
// sends a clean JSON response to the client.

// Handle 404 — Route Not Found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found — ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Error Handler
// This middleware catches any error thrown in the app
const errorHandler = (err, req, res, next) => {
  // If status code is 200 (default), change it to 500 (server error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // Only show stack trace in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
