const {
  createPackage,
  getPackage,
  updatePackage,
} = require("../../../common/validators/packageValidator");
const PackageModel = require("../../../common/models/package");
const { notFound } = require("../../../common/errorCodes");

let { successResponse, errorResponse } = require("../../../common/helpers");

const create = async (req, res, next) => {
  try {
    const body = await createPackage.validateAsync(req.body);

    const savedPackage = await PackageModel(body).save();

    res.status(201).json(successResponse({ data: savedPackage }));
  } catch (error) {
    console.log("Create Package Error", error);
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    await getPackage.validateAsync(req.params);

    const package = await PackageModel.findById(req.params.id);

    if (!package) {
      return res.status(404).json(
        errorResponse({
          message: "Package not found",
          errorCode: notFound,
        }),
      );
    }

    res.status(200).json(successResponse({ data: package }));
  } catch (error) {
    console.log("Get package error", error);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const packages = await PackageModel.find({});

    res.status(200).json(successResponse({ data: packages }));
  } catch (error) {
    console.log("Get all packages error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const input = await updatePackage.validateAsync(
      Object.assign(req.body, { ...req.params }),
    );

    const package = await PackageModel.findById(input.id);

    if (!package) {
      return res.status(404).json(
        errorResponse({
          message: "Package not found",
          errorCode: notFound,
        }),
      );
    }

    const updatedPackage = await PackageModel.findByIdAndUpdate(
      input.id,
      input,
      { new: true },
    );

    res.status(200).json(successResponse({ data: updatedPackage }));
  } catch (error) {
    console.log("Package update error", error);
    next(error);
  }
};

const deletePackage = async (req, res, next) => {
  try {
    await getPackage.validateAsync(req.params);

    const package = await PackageModel.findById(req.params.id);

    if (!package) {
      return res.status(404).json(
        errorResponse({
          message: "Package not found",
          errorCode: notFound,
        }),
      );
    }

    await PackageModel.findByIdAndUpdate(req.params.id, { isDeleted: true });

    res.status(200).json(successResponse({ message: "Successfully deleted" }));
  } catch (error) {
    console.log("Delete package error", error);
    next(error);
  }
};

module.exports = { create, get, getAll, update, deletePackage };
