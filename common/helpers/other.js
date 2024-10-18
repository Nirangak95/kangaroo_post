const config = require("../config");
const fs = require("fs");

async function folderPathCheck(paths) {
  try {
    paths.forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
    });
  } catch (err) {
    console.error("File paths creating error:", err);
  }
}

const successResponse = ({
  message = null,
  data = null,
  errorCode = null,
}) => ({
  status: true,
  message,
  data,
  errorCode,
});

const errorResponse = ({ message = null, data = null, errorCode = null }) => ({
  status: false,
  message,
  errorCode,
  data,
});

function createClientError(message, errorCode) {
  const error = new Error(message);
  error.isClientError = true;
  error.errorCode = errorCode;
  return error;
}

module.exports = { folderPathCheck, successResponse, errorResponse, createClientError };
