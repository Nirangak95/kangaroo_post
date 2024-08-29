const modelName = "customer";
const index = require("./index");

const schema = {
  _id: { type: Number, ref: modelName },

  /** properties */
  salutation: {
    type: String,
    enum: ["Dr", "Miss", "Mr", "Mrs", "Ms", "Rev"],
  },
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String },

  /** phone */
  countryCode: { type: String, required: true },
  postalCode: { type: Number, default: 94105 },
  contactNumber: { type: String, required: true, unique: true, index: true },
  alternativeContactNumber: { type: String },
  smsMobileNumber: { type: String },

  /** password */
  password: { type: String },
  passwordResetToken: { type: String },
  passwordResetExpire: { type: String }, // 30 min

  address: { type: String },

  homeAddress: {
    address: { type: String },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
  workAddress: {
    address: { type: String },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },

  firebaseID: { type: String },
  emergencyContact: { type: Number },
  imagePath: { type: String },

  verificationCode: { type: Number },
  verificationCodeExpire: { type: String }, // 30 min
  isVerified: { type: Boolean, default: false },

  /** hires */
  completedHiresCount: { type: Number, default: 0 },
  cancelledHiresCount: { type: Number, default: 0 },

  /** OGO && HNB payments */
  creditCards: { type: Array, default: [] },
  transactions: { type: Array, default: [] },

  /** type */
  type: {
    type: String,
    default: "Bronze",
    enum: ["Gold", "Silver", "Bronze", "VIP"],
  },

  /** category */
  category: {
    type: String,
    default: "App",
    enum: [
      "Call-Center",
      "App",
      "External",
      "Corporate",
      "Outlet",
      "Website",
      "External-Api",
      "Tour",
    ],
    required: true,
  },

  /** kangaroo miles all in  rupees value */
  milesCount: { type: Number, default: 0 }, // balance of the miles count
  milesSummary: {
    totalPaid: { type: Number, default: 0 },
    totalSent: { type: Number, default: 0 },
    totalEarned: { type: Number, default: 0 },
    totalReceived: { type: Number, default: 0 },
    totalPurchased: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
  },

  // default payment option
  defaultPayment: {
    type: { type: String, default: "Cash" },
    token: { type: String, default: null },
  },
};

const schemaTemplate = index.createSchema(schema, modelName);
module.exports = index.setModel(schemaTemplate, modelName);
