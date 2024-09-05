const config = require("../config");
const fs = require("fs");

async function createPaths(paths) {
  try {
    const primaryPath = [
      config.IMAGES.PRIMARY_PATH,
      config.IMAGES.RESIZED_PATH,
    ];

    const updatedPaths = primaryPath.concat(paths);

    updatedPaths.forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
    });
  } catch (err) {
    console.error("File paths creating error:", err);
  }
}

module.exports = { createPaths };
