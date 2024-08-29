module.exports = (app) => {
  app.use("/api-customer/orders", require("./order/index"));
};
