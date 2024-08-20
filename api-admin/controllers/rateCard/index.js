const {
  getRateCard,
  createRateCard,
  updateRateCard
} = require("../../../common/validators/rateCardValidator");
const RateCardModel = require("../../../common/models/rateCard");

let { successResponse, errorResponse } = require("../../../common/helpers");

const create = async (req, res, next) => {
  try {
    const body = await createRateCard.validateAsync(req.body);

    const savedRateCard = await RateCardModel(body).save();

    res.status(201).json(successResponse({ data: savedRateCard }));
  } catch (error) {
    console.log("Create Rate Card Error", error);
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    await getRateCard.validateAsync(req.params);

    const rateCard = await RateCardModel.findById(req.params.id);

    if (!rateCard) {
      return res
        .status(404)
        .json(errorResponse({ message: "Rate card not found" }));
    }

    res.status(200).json(successResponse({ data: rateCard }));
  } catch (error) {
    console.log("Get rate card error", error);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const rateCards = await RateCardModel.find({});

    res.status(200).json(successResponse({ data: rateCards }));
  } catch (error) {
    console.log("Get all rate cards error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {

    const input = await updateRateCard.validateAsync(Object.assign(req.body, { ...req.params }));

    const rateCard = await RateCardModel.findById(input.id);

    if (!rateCard) {
      return res
        .status(404)
        .json(errorResponse({ message: "Rate card not found" }));
    }

    const updatedRateCard = await RateCardModel.findByIdAndUpdate(
      input.id,
      input,
      { new: true },
    );

    res.status(200).json(successResponse({ data: updatedRateCard }));
  } catch (error) {
    console.log("Rate card update error", error);
    next(error);
  }
};

module.exports = { create, get, getAll, update };
