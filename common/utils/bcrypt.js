const bcrypt = require("bcrypt");
const config = require("../config");
const SALT_WORKER = config.security.SALT_WORKER;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_WORKER);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
};

const comparePassword = async (inputPass, encryptedPass) => {
  try {
    const isMatch = await bcrypt.compare(inputPass, encryptedPass);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

module.exports = { hashPassword, comparePassword };
