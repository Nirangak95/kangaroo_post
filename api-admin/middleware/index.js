const errorCodes = require("../../common/errorCodes");

const notFoundHandler = (req, res, next) => {
  const errorCode = errorCodes.notFound;
  res.status(404).json({
    status: false,
    message: "Resource not found",
    errorCode,
    data: null,
  });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let errorCode = err.errorCode || null;

  if (err?.name == "ValidationError") {
    errorCode = errorCodes.validationError;
  }

  res.status(statusCode).json({
    status: false,
    message: err.message || "Internal Server Error",
    errorCode,
    data: null,
  });
};

module.exports = { notFoundHandler, errorHandler };
