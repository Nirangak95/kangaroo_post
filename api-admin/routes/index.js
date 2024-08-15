module.exports = (app) => {
  app.use("/api-admin/rate-cards", require("./rateCard/index"));
};
