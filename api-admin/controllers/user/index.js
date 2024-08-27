const {
  getUser,
  createUser,
  updateUser,
  authenticateUser,
} = require("../../../common/validators/userValidator");
const UserModel = require("../../../common/models/user");
const { notFound, authenticationFail } = require("../../../common/errorCodes");
const {
  hashPassword,
  comparePassword,
} = require("../../../common/utils/bcrypt");
const config = require("../../../common/config");

const jwt = require("jsonwebtoken");

let { successResponse, errorResponse } = require("../../../common/helpers");

const properties =
  "userName role email contactNumber status isLogged createdAt isDeleted";

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

    const user = await UserModel.findById(req.params.id)
      .select(properties)
      .lean();

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
    const users = await UserModel.find({}).select(properties).lean();

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
    }).lean();

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
    }).lean();

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

const authenticate = async (req, res, next) => {
  try {
    const { userName, password } = await authenticateUser.validateAsync(req.body);

    const user = await UserModel.findOne({
      userName
    })
      .select(`password _id`)
      .lean();

    if (!user) {
      return res.status(404).json(
        errorResponse({
          message: "User not found",
          errorCode: authenticationFail,
        }),
      );
    }

    //Validate Password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json(
        errorResponse({
          message: "Invalid password",
          errorCode: notFound,
        }),
      );
    }
    const token = jwt.sign(
      { userId: user._id, password: user.password },
      config.security.SECRET_KEY,
      // { expiresIn: '30s' }
    );

    res.status(200).json(successResponse({ message: "Ok", data: { token } }));
  } catch (error) {
    console.log("Error authenticate user", error);
    next(error);
  }
};

module.exports = { create, get, getAll, update, deleteUser, authenticate };
