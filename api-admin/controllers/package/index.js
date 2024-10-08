const {
  createPackage,
  getPackage,
  updatePackage,
} = require("../../../common/validators/packageValidator");
const PackageModel = require("../../../common/models/package");
const { notFound } = require("../../../common/errorCodes");

const { successResponse, errorResponse } = require("../../../common/helpers");

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

    const packageDetails = await PackageModel.findById(req.params.id).lean();

    if (!packageDetails) {
      return res.status(404).json(
        errorResponse({
          message: "Package not found",
          errorCode: notFound,
        }),
      );
    }

    res.status(200).json(successResponse({ data: packageDetails }));
  } catch (error) {
    console.log("Get package error", error);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const packages = await PackageModel.find({}).lean();

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

    const updatedPackage = await PackageModel.findByIdAndUpdate(
      input.id,
      input,
      { new: true },
    ).lean();

    if (!updatedPackage) {
      return res.status(404).json(
        errorResponse({
          message: "Package not found",
          errorCode: notFound,
        }),
      );
    }

    res.status(200).json(successResponse({ data: updatedPackage }));
  } catch (error) {
    console.log("Package update error", error);
    next(error);
  }
};

const deletePackage = async (req, res, next) => {
  try {
    await getPackage.validateAsync(req.params);

    const deletedPackage = await PackageModel.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    }).lean();

    if (!deletedPackage) {
      return res.status(404).json(
        errorResponse({
          message: "Package not found",
          errorCode: notFound,
        }),
      );
    }

    res.status(200).json(successResponse({ message: "Successfully deleted" }));
  } catch (error) {
    console.log("Delete package error", error);
    next(error);
  }
};

module.exports = { create, get, getAll, update, deletePackage };
