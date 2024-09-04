const config = require("../config");
const { redis } = require("../constants");
const { redis1, redis2 } = require("../../common/clients")

const setRedisKey = async (db, key, value) => {

    let serializedValue = JSON.stringify(value);

    if (db == redis.ONE) {
        await redis1.set(key, serializedValue);
    } else {
        await redis2.set(key, serializedValue);
    }
}

module.exports = { setRedisKey }