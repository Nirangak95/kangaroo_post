const modelName = "customer";
const index = require("./index");
const {
  orderStatus: os,
  paymentMethod: pm,
  serviceType: st,
  userType: ut,
  orderBy: ob,
  orderType: ot,
} = require("../constants");

const schema = {
  _id: { type: Number, ref: modelName },

  /** properties */
  customerId: { type: Number, required: true },
  packageId: { type: Number, required: true },
  vehicularType: { type: String },
  vehicularModel: { type: String },
  vehicularNo: { type: String },
  driverId: { type: Number },
  status: {
    type: String,
    enum: [
      os.PENDING,
      os.ACCEPT_BY_DRIVER,
      os.ON_THE_WAY_PICKUP,
      os.PICKED,
      os.ON_THE_WAY_DELIVERY,
      os.DELIVERED,
      os.AWAITING_PAYMENT,
      os.PAID,
      os.CANCELED,
    ],
    required: true,
  },
  orderBy: { type: String, enum: [ob.WEB, ob.APP], required: true },
  deliveryAddress: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  totalFare: { type: Number, default: 0 },
  fare: {
    _id: false,
    type: {
      base: { type: Number },
      waiting: { type: Number },
      additional: { type: Number },
    },
  },
  location: {
    _id: false,
    driverAccepted: {
      lat: { type: Number },
      lng: { type: Number },
    },
    initialPickup: {
      lat: { type: Number },
      lng: { type: Number },
    },
    picked: {
      lat: { type: Number },
      lng: { type: Number },
    },
    initialDelivery: {
      lat: { type: Number },
      lng: { type: Number },
    },
    delivered: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  driverRating: { type: Number },
  customerRating: { type: Number },
  comments: {
    byDriver: { type: String },
    byCustomer: { type: String },
  },
  //Kilo Meter
  totalDistance: { type: Number },
  distance: {
    base: { type: Number },
    additional: { type: Number },
  },
  time: {
    requested: { type: Date, required: true },
    accepted: { type: Date, required: true },
    picked: { type: Date, required: true },
    delivered: { type: Date, required: true },
    paid: { type: Date, required: true },
    total: { type: Date, required: true },
  },
  otp: {
    code: { type: Number },
    status: { type: String },
    expiredAt: { type: Date },
  },
  paymentMethod: {
    type: String,
    enum: [pm.CASH, pm.CORPORATE, pm.CREDIT_CARD],
    required: true,
  },
  paymentData: {
    type: Object,
  },
  orderType: {
    type: String,
    enum: [ot.SEND, ot.RECEIVE],
    required: true,
  },
  sender: {
    id: { type: Number },
    firstName: { type: String },
    lastName: { type: String },
    contactNo: { type: Number },
  },
  receiver: {
    id: { type: Number },
    firstName: { type: String },
    lastName: { type: String },
    contactNo: { type: Number },
  },
  userType: {
    type: String,
    enum: [ut.PERSONAL, ut.MERCHANT, ut.CORPORATE],
    required: true,
  },
  dropPoints: {
    type: [
      {
        id: { type: Number },
        time: {
          startAt: { type: Date },
          endAt: { type: Date },
        },
        location: {
          start: { lat: { type: Number }, lng: { type: Number } },
          end: { lat: { type: Number }, lng: { type: Number } },
        },
        distance: { type: Number },
        receiver: {
          firstName: { type: String },
          lastName: { type: String },
          contactNo: { type: String },
        },
      },
    ],
  },
  serviceType: { type: String, enum: [st.EAT, st.POST], required: true },
};

const schemaTemplate = index.createSchema(schema, modelName);
module.exports = index.setModel(schemaTemplate, modelName);
