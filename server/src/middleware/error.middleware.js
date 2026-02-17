export function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;

  const message =
    err.message || "Something went wrong. Please try again later.";

  if (process.env.NODE_ENV !== "production") {
    console.error("❌ Error:", err);
  }

  res.status(status).json({
    message,
  });
}
