const modelName = "restaurant";
const index = require("./index");
const SALT_WORK_FACTOR = 10;
const bcrypt = require("bcrypt");

const schema = {
  _id: { type: Number, ref: modelName },

  /** properties */
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  contactPersonDetails: { type: String, default: null },
  opening: { type: String, default: null },
  logo: { type: Object, default: null },
  bankDetails: { type: String, default: null },
  commissionRate: { type: Number, required: true, default: null },
  firebaseId: { type: String, default: null },
  rating: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["active", "block", "unavailable"],
    default: "unavailable",
  },
  isLogged: { type: Boolean, default: false },
};

const schemaTemplate = index.createSchema(schema, modelName);

//Hash password before saving
schemaTemplate.pre("save", function (next) {
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
schemaTemplate.methods.comparePassword = function (restaurantPassword, cb) {
  bcrypt.compare(restaurantPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = index.setModel(schemaTemplate, modelName);
