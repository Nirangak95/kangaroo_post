const joi = require("joi");

const createRestaurant = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().required().email(),
  userName: joi.string().required(),
  password: joi.string().required(),
  city: joi.string().required(),
  contactPersonDetails: joi.string(),
  opening: joi.string(),
  logo: joi.string(),
  bankDetails: joi.string(),
  commissionRate: joi.number().required(),
  status: joi.string(),
  location: joi.string().required(),
  address: joi.string().required(),
});

const getRestaurant = joi.object().keys({
  id: joi.number().required(),
});

module.exports = { createRestaurant, getRestaurant };
