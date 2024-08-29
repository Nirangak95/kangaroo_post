const joi = require("joi");
const { status, userRoles } = require("../constants");

const createUser = joi.object().keys({
  userName: joi.string().required().min(3),
  password: joi.string().required().min(3),
  role: joi.string().allow(userRoles.ADMIN).only().required(),
  email: joi.string(),
  contactNumber: joi.string(),
  status: joi
    .string()
    .trim()
    .allow(status.ENABLED, status.DISABLED)
    .only()
    .required(),
});

const getUser = joi.object().keys({
  id: joi.number().required(),
});

const updateUser = joi.object().keys({
  id: joi.number().required(),
  userName: joi.string().min(3),
  password: joi.string().min(3),
  role: joi.string().allow(userRoles.ADMIN).only(),
  email: joi.string(),
  contactNumber: joi.string(),
  status: joi.string().trim().allow(status.ENABLED, status.DISABLED).only(),
});

const authenticateUser = joi.object().keys({
  userName: joi.string().required(),
  password: joi.string().required(),
});

module.exports = { createUser, getUser, updateUser, authenticateUser };
