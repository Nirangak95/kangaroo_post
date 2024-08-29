const modelName = "package";
const index = require("./index");
const { status } = require("../constants");

const schema = {
  _id: { type: Number, ref: modelName },

  /** properties */
  name: { type: String, required: true, unique: true },
  allowedWeight: {
    _id: false,
    type: {
      min: { type: Number },
      max: { type: Number, default: null },
    },
  },
  baseKM: { type: Number, required: true },
  packagePrice: { type: Number, required: true },
  perKMRate: { type: Number, required: true },
  waitingRatePerMin: { type: Number, default: 0 },
  status: {
    type: String,
    enum: [status.ENABLED, status.DISABLED],
    default: status.ENABLED,
  },
  isDeleted: { type: Boolean, default: false },
  vehicularTypes: {
    type: [{ type: String }],
    required: true,
  },
};

const schemaTemplate = index.createSchema(schema, modelName);
module.exports = index.setModel(schemaTemplate, modelName);
