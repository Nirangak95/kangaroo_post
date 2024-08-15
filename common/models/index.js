const mongoose = require("mongoose");
const autoIncrementFactory = require("mongoose-sequence");
const uniqueValidator = require("mongoose-unique-validator");
const config = require("../../common/config");

const connection = mongoose.createConnection(config.mongoDatabase);

const autoIncrement = autoIncrementFactory(connection);

function setModel(schema, modelName) {
  let model;
  if (mongoose.models.model) {
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
}

function createSchema(schemaDefinition, modelName) {
  const schema = new mongoose.Schema(schemaDefinition, {
    timestamps: true,
  });

  setPlugins(schema, modelName);
  return schema;
}

module.exports = {
  autoIncrement,
  setModel,
  createSchema,
};
