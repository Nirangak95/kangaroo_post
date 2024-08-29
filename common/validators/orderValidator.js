const joi = require("joi");
const {
    orderStatus: os,
    paymentMethod: pm,
    serviceType: st,
    userType: ut,
    orderBy: ob,
    orderType: ot,
} = require("../constants");

const createOrder = joi.object().keys({
    customerId: joi.number().required(),
    packageId: joi.number().required(),
    vehicularType: joi.string(),
    vehicularModel: joi.string(),
    vehicularNo: joi.string(),
    driverId: joi.number(),
    status: joi
        .number()
        .required()
        .allow(
            os.PENDING,
            os.ACCEPT_BY_DRIVER,
            os.ON_THE_WAY_PICKUP,
            os.PICKED,
            os.ON_THE_WAY_DELIVERY,
            os.DELIVERED,
            os.AWAITING_PAYMENT,
            os.PAID,
            os.CANCELED,
        )
        .only(),
    orderBy: joi.string().allow(ob.WEB, ob.APP).only(),
    deliveryAddress: joi.string().required(),
    pickupAddress: joi.string().required(),
    location: {
        initialPickup: joi
            .object({
                lat: joi.number(),
                lng: joi.number(),
            })
            .required(),
        initialDelivery: joi
            .object({
                lat: joi.number(),
                lng: joi.number(),
            })
            .required(),
    },
    paymentMethod: joi
        .string()
        .allow(pm.CASH, pm.CORPORATE, pm.CREDIT_CARD)
        .only(),
    orderType: joi.string().allow(ot.SEND, ot.RECEIVE).only(),
    receiver: {
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        contactNo: joi.string().required(),
    },
    userType: joi.string().allow(ut.PERSONAL, ut.MERCHANT, ut.CORPORATE).only(),
    dropPoints: joi.array({
        location: {
            start: joi.object({
                lat: joi.number(),
                lng: joi.number(),
            }),
            end: joi.object({
                lat: joi.number(),
                lng: joi.number(),
            }),
        },
        receiver: {
            firstName: joi.string(),
            lastName: joi.string(),
            contactNo: joi.string()
        },
    }),
    serviceType: joi.string().allow(st.EAT, st.POST).only()
});

module.exports = { createOrder };
