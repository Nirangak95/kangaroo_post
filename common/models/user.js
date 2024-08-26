const modelName = "user";
const index = require("./index");
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;
const { Status, UserRoles } = require("../constants");

const schema = {
  _id: { type: Number, ref: modelName },

  /** properties */
  username: { type: String, required: true, unique: true },
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

//Hash password before saving
schema.pre("save", function (next) {
  const restaurant = this;
  if (!restaurant.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(restaurant.password, salt, (err, hash) => {
      if (err) return next(err);

      restaurant.password = hash;
      next();
    });
  });
});

// Verify password
schema.methods.comparePassword = function (restaurantPassword, cb) {
  bcrypt.compare(restaurantPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const schemaTemplate = index.createSchema(schema, modelName);
module.exports = index.setModel(schemaTemplate, modelName);
