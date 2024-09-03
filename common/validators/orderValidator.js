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
        .string()
        .default(os.PENDING).only(),
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
        .only().required(),
    orderType: joi.string().allow(ot.SEND, ot.RECEIVE).only().required(),
    receiver: {
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        contactNo: joi.string().required(),
    },
    userType: joi.string().allow(ut.PERSONAL, ut.MERCHANT, ut.CORPORATE).only().required(),
    dropPoints: joi.array().items({
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
            contactNo: joi.string(),
        },
    }),
    serviceType: joi.string().allow(st.EAT, st.POST).only().required(),
});

module.exports = { createOrder };
