const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
};

module.exports = { hashPassword };
