const joi = require("joi");
const { Status } = require("../constants");

const createRateCard = joi.object().keys({
  vehicularType: joi.string().trim(true).required(),
  vehicularModel: joi
    .array()
    .items(
      joi.object({
        modelName: joi.string().required().trim(),
        maxWeight: joi.number(),
        minWeight: joi.number(),
      }),
    )
    .required(),
  status: joi.string().trim().allow(Status.ENABLED, Status.DISABLED).only().required(),

});

const getRateCard = joi.object().keys({
  id: joi.number().required(),
});

const updateRateCard = joi.object().keys({
  id: joi.number().required(),
  vehicularType: joi.string().trim(),
  vehicularModel: joi.array().items(
    joi.object({
      modelName: joi.string().trim(),
      maxWeight: joi.number(),
      minWeight: joi.number(),
    }),
  ),
  status: joi.string().trim().allow(Status.ENABLED, Status.DISABLED).only(),
});

module.exports = { createRateCard, getRateCard, updateRateCard };
