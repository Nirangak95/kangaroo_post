const joi = require("joi");
const { Status } = require("../constants");

const createPackage = joi.object().keys({
  name: joi.string().trim().required(),
  vehicularTypes: joi.array().items(joi.string().min(2)).required().min(1),
  status: joi
    .string()
    .trim()
    .allow(Status.ENABLED, Status.DISABLED)
    .only()
    .required(),
  allowedWeight: joi
    .object({
      min: joi.number(),
      max: joi.number().default(null),
    })
    .required(),
  baseKM: joi.number().required(),
  packagePrice: joi.number().required(),
  perKMRate: joi.number().required(),
  waitingRatePerMin: joi.number().default(0),
});

const getPackage = joi.object().keys({
  id: joi.number().required(),
});

const updatePackage = joi.object().keys({
  id: joi.number().required(),
  type: joi.string().trim(),
  vehicularTypes: joi.array().items(),
  status: joi.string().trim().allow(Status.ENABLED, Status.DISABLED).only(),
  allowedWeight: joi.object({
    min: joi.number().default(null),
    max: joi.number().default(null),
  }),
  baseKM: joi.number(),
  packagePrice: joi.number(),
  perKMRate: joi.number(),
  waitingRatePerMin: joi.number(),
});

module.exports = { createPackage, getPackage, updatePackage };
