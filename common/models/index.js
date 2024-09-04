const mongoose = require("mongoose");
const autoIncrementFactory = require("mongoose-sequence");
const uniqueValidator = require("mongoose-unique-validator");

function getAutoIncrement() {
  if (mongoose.connection.readyState === 1) {
    return autoIncrementFactory(mongoose.connection);
  } else {
    throw new Error("Mongoose is not connected");
  }
}

const autoIncrement = getAutoIncrement();

// For avoiding getting deleted result
const softDeletePlugin = (schema) => {
  schema.pre("find", function () {
    this.where({ isDeleted: false });
  });

  schema.pre("findOne", function () {
    this.where({ isDeleted: false });
  });

  schema.pre("findOneAndUpdate", function () {
    this.where({ isDeleted: false });
  });

  schema.pre("countDocuments", function () {
    this.where({ isDeleted: false });
  });

  schema.pre("aggregate", function () {
    this.pipeline().unshift({ $match: { isDeleted: false } });
  });
};

function setModel(schema, modelName) {
  let model;
  if (mongoose.models[modelName]) {
    model = mongoose.model(modelName);
  } else {
    model = mongoose.model(modelName, schema);
  }
  return model;
}

function setPlugins(schema, modelName) {
  schema.plugin(autoIncrement, { id: modelName, inc_field: "_id" });

  schema.plugin(uniqueValidator, {
    message: "Error, expected {PATH} to be unique.",
  });

  schema.plugin(softDeletePlugin);
}

function createSchema(schemaDefinition, modelName) {
  const schema = new mongoose.Schema(schemaDefinition, {
    timestamps: true,
  });

  setPlugins(schema, modelName);
  return schema;
}

module.exports = {
  setModel,
  createSchema,
};
