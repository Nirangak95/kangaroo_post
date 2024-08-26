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

const updateUser = joi.object().keys({
  id: joi.number().required(),
  username: joi.string().min(3),
  password: joi.string().min(3),
  role: joi.string().allow(UserRoles.ADMIN).only(),
  email: joi.string(),
  contactNumber: joi.string(),
  status: joi.string().trim().allow(Status.ENABLED, Status.DISABLED).only(),
});

module.exports = { createUser, getUser, updateUser };
