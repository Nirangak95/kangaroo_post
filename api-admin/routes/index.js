module.exports = (app) => {
  app.use("/api-admin/rate-cards", require("./rateCard/index"));
  app.use("/api-admin/packages", require("./package/index"));
  app.use("/api-admin/users", require("./user/index"));
};
