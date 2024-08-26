const {
  getUser,
  createUser,
} = require("../../../common/validators/userValidator");
const UserModel = require("../../../common/models/user");
const { notFound } = require("../../../common/errorCodes");
const config = require("../../../common/config");

let { successResponse, errorResponse } = require("../../../common/helpers");

const create = async (req, res, next) => {
  try {
    await createUser.validateAsync(req.body);

    const savedUser = await UserModel(req.body).save();

    res.status(201).json(successResponse({ data: savedUser }));
  } catch (error) {
    console.log("Create User Error", error);
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    await getUser.validateAsync(req.params);

    const user = await UserModel.findById(req.params.id, userFields);

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
    const users = await UserModel.find({}, userFields);

    res.status(200).json(successResponse({ data: users }));
  } catch (error) {
    console.log("Get all users", error);
    next(error);
  }
};

// const update = async (req, res, next) => {
//     try {
//         const input = await updateRateCard.validateAsync(
//             Object.assign(req.body, { ...req.params }),
//         );

//         const rateCard = await RateCardModel.findById(input.id);

//         if (!rateCard) {
//             return res.status(404).json(
//                 errorResponse({
//                     message: "Rate card not found",
//                     errorCode: notFound,
//                 }),
//             );
//         }

//         const updatedRateCard = await RateCardModel.findByIdAndUpdate(
//             input.id,
//             input,
//             { new: true },
//         );

//         res.status(200).json(successResponse({ data: updatedRateCard }));
//     } catch (error) {
//         console.log("Rate card update error", error);
//         next(error);
//     }
// };

// const deleteRateCard = async (req, res, next) => {
//     try {
//         await getRateCard.validateAsync(req.params);

//         const rateCard = await RateCardModel.findById(req.params.id);

//         if (!rateCard) {
//             return res.status(404).json(
//                 errorResponse({
//                     message: "Rate card not found",
//                     errorCode: notFound,
//                 }),
//             );
//         }

//         await RateCardModel.findByIdAndUpdate(req.params.id, { isDeleted: true });

//         res.status(200).json(successResponse({ message: "Successfully deleted" }));
//     } catch (error) {
//         console.log("Rate card delete error", error);
//         next(error);
//     }
// };


const userFields = {
  username: 1,
  role: 1,
  email: 1,
  contactNumber: 1,
  status: 1,
  isLogged: 1,
  createdAt: 1,
  isDeleted: 1
}

module.exports = { create, get, getAll };
