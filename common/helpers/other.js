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

module.exports = { folderPathCheck, successResponse, errorResponse };
