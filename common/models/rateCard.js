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

  maxDimensions: {
    type: {
      _id: false,
      length: { type: Number, default: null },
      width: { type: Number, default: null },
      height: { type: Number, default: null },
    },
    required: true,
  },

  status: {
    type: String,
    enum: [Status.ENABLED, Status.DISABLED],
    default: Status.ENABLED,
  },
  isDeleted: { type: Boolean, default: false },
  mapIconUrl: { type: String, default: null },
  imageUrl: { type: String, default: null },
};

const schemaTemplate = index.createSchema(schema, modelName);
module.exports = index.setModel(schemaTemplate, modelName);
