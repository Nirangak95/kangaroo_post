const status = {
  ENABLED: "enabled",
  DISABLED: "disabled",
};

const userRoles = {
  ADMIN: "admin",
};

const orderStatus = {
  PENDING: "pending",
  ACCEPT_BY_DRIVER: "accept-by-driver",
  ON_THE_WAY_PICKUP: "on-the-way-pickup",
  PICKED: "picked",
  ON_THE_WAY_DELIVERY: "on-the-way-delivery",
  DELIVERED: "delivered",
  AWAITING_PAYMENT: "awaiting-payment",
  PAID: "paid",
  CANCELED: "canceled",
};

const paymentMethod = {
  CASH: "cash",
  CREDIT_CARD: "credit-card",
  CORPORATE: "corporate",
};

const serviceType = {
  EAT: "eat",
  POST: "post",
};

const userType = {
  PERSONAL: "personal",
  MERCHANT: "merchant",
  CORPORATE: "corporate",
};

const orderBy = {
  WEB: "web",
  APP: "app",
};

const redis = {
  ONE: 1,
  TWO: 2,
};

const orderType = {
  SEND: "send",
  RECEIVE: "receive",
};

module.exports = {
  status,
  userRoles,
  orderStatus,
  paymentMethod,
  serviceType,
  userType,
  orderBy,
  orderType,
  redis
};
