const joi = require("joi");
const { Status, UserRoles } = require("../constants");

const createUser = joi.object().keys({
  username: joi.string().required().min(3),
  password: joi.string().required().min(3),
  role: joi.string().allow(UserRoles.ADMIN).only().required(),
  email: joi.string(),
  contactNumber: joi.string(),
  status: joi
    .string()
    .trim()
    .allow(Status.ENABLED, Status.DISABLED)
    .only()
    .required(),
});

const getUser = joi.object().keys({
  id: joi.number().required(),
});

module.exports = { createUser, getUser };
