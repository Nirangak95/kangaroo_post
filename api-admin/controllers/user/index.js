const {
  getUser,
  createUser,
  updateUser,
} = require("../../../common/validators/userValidator");
const UserModel = require("../../../common/models/user");
const { notFound } = require("../../../common/errorCodes");
const { hashPassword } = require("../../../common/utils/bcrypt");

let { successResponse, errorResponse } = require("../../../common/helpers");

const create = async (req, res, next) => {
  try {
    await createUser.validateAsync(req.body);

    const savedUser = await UserModel(req.body).save();

    res.status(201).json(successResponse({ data: savedUser }));
  } catch (error) {
    console.log("Error creating user", error);
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    await getUser.validateAsync(req.params);

    const user = await UserModel.findById(req.params.id).select(userFields);

    if (!user) {
      return res.status(404).json(
        errorResponse({
          message: "User not found",
          errorCode: notFound,
        }),
      );
    }

    res.status(200).json(successResponse({ data: user }));
  } catch (error) {
    console.log("Get user error", error);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await UserModel.find({}).select(userFields);

    res.status(200).json(successResponse({ data: users }));
  } catch (error) {
    console.log("Get all users", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const input = await updateUser.validateAsync(
      Object.assign(req.body, { ...req.params }),
    );

    //If exists new password, hash the password
    if (input.password) {
      input.password = await hashPassword(input.password);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(input.id, input, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json(
        errorResponse({
          message: "User not found",
          errorCode: notFound,
        }),
      );
    }

    res.status(200).json(successResponse({ data: updatedUser }));
  } catch (error) {
    console.log("Rate card update error", error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await getUser.validateAsync(req.params);

    const deletedUser = await UserModel.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });

    if (!deletedUser) {
      return res.status(404).json(
        errorResponse({
          message: "User not found",
          errorCode: notFound,
        }),
      );
    }

    res.status(200).json(successResponse({ message: "Successfully deleted" }));
  } catch (error) {
    console.log("Error deleting user", error);
    next(error);
  }
};

const userFields =
  "username role email contactNumber status isLogged createdAt isDeleted";

module.exports = { create, get, getAll, update, deleteUser };
