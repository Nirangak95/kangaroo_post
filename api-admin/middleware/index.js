const errorCodes = require("../../common/errorCodes");
const jwt = require("jsonwebtoken");
const config = require("../../common/config");
let { errorResponse } = require("../../common/helpers");

const notFoundHandler = (req, res, next) => {
  const errorCode = errorCodes.notFound;

  return res.status(404).json(
    errorResponse({
      message: "Resource not found",

      errorCode,
    }),
  );
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let errorCode = err.errorCode || null;

  if (err?.name == "ValidationError" || err?.code == "E11000") {
    statusCode = 400;
    errorCode = errorCodes.validationError;
  }

  return res.status(statusCode).json(
    errorResponse({
      message: err.message || "Internal Server Error",
      data: err,
      errorCode,
    }),
  );
};

const tokenValidation = (req, res, next) => {
  //Allowed without token
  if (req.url.includes("users/authenticate")) {
    return next();
  }

  let token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (req.headers["authorization"]) {
    token = req.headers["authorization"].split(" ")[1];
  }

  if (!token) {
    return res.status(401).json(
      errorResponse({
        message: "Please provide the token",
        errorCode: errorCodes.authenticationFail,
      }),
    );
  } else {
    jwt.verify(token, config.security.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return res.status(401).json(
            errorResponse({
              message: "Invalid token",
              errorCode: errorCodes.authenticationFail,
            }),
          );
        } else if (err.name === "TokenExpiredError") {
          return res.status(401).json(
            errorResponse({
              message: "Token expired",
              errorCode: errorCodes.authenticationFail,
            }),
          );
        } else {
          return res.status(401).json(
            errorResponse({
              message: "Invalid token",
              errorCode: errorCodes.authenticationFail,
            }),
          );
        }
      } else {
        return next();
      }
    });
  }
};

module.exports = { notFoundHandler, errorHandler, tokenValidation };
