const modelName = "user";
const index = require("./index");
const { hashPassword } = require("../utils/bcrypt");

const { Status, UserRoles } = require("../constants");

const schema = {
  _id: { type: Number, ref: modelName },

  /** properties */
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: [UserRoles.ADMIN] },
  firebaseID: { type: String, default: null },
  email: { type: String, default: null },
  contactNumber: { type: String, default: null },
  status: {
    type: String,
    enum: [Status.ENABLED, Status.DISABLED],
    default: Status.ENABLED,
  },
  passwordResetCode: { type: Number, default: null },
  passwordResetCodeExpire: { type: Number },

  isLogged: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
};

const schemaTemplate = index.createSchema(schema, modelName);

//Hash password before saving
schemaTemplate.pre("save", async function (next) {
  const user = this;
  // If the password is not modified, skip hashing
  if (!user.isModified("password")) return next();

  try {
    user.password = await hashPassword(user.password);
    next();
  } catch (err) {
    next(err);
  }
});

// Verify password
// schemaTemplate.methods.comparePassword = function (userPassword, cb) {
//   bcrypt.compare(userPassword, this.password, (err, isMatch) => {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

module.exports = index.setModel(schemaTemplate, modelName);
