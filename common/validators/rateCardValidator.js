const joi = require("joi");
const { Status } = require("../constants");

const createRateCard = joi.object().keys({
  vehicularType: joi.string().trim(true).required(),
  vehicularModel: joi
    .array()
    .items(
      joi.object({
        modelName: joi.string().required().trim(),
        maxWeight: joi.number().allow(null),
        minWeight: joi.number().allow(null),
      }),
    )
    .required(),
  status: joi
    .string()
    .trim()
    .allow(Status.ENABLED, Status.DISABLED)
    .only()
    .required(),
  maxDimensions: joi
    .object({
      length: joi.number(),
      width: joi.number(),
      height: joi.number(),
    })
    .required(),

  mapIconUrl: joi.string().default(null).allow(null),
  imageUrl: joi.string().default(null).allow(null),
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
