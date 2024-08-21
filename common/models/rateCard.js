const modelName = "rateCard";
const index = require("./index");
const { Status } = require("../constants");

const schema = {
  _id: { type: Number, ref: modelName },

  /** properties */
  vehicularType: { type: String, required: true, unique: true },
  vehicularModel: {
    type: [
      {
        _id: false,
        modelName: { type: String, required: true },
        maxWeight: { type: Number, default: null },
        minWeight: { type: Number, default: null },
      },
    ],
    required: true,
  },

  status: {
    type: String,
    enum: [Status.ENABLED, Status.DISABLED],
    default: Status.ENABLED,
  },
  isDeleted: { type: Boolean, default: false },
};

const schemaTemplate = index.createSchema(schema, modelName);
module.exports = index.setModel(schemaTemplate, modelName);
