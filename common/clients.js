const Redis = require('ioredis');
const mongoose = require("mongoose");

const config = require('../common/config');

const redis1 = new Redis(config.REDIS_DB_1);
const redis2 = new Redis(config.REDIS_DB_2);

module.exports = { redis1, redis2 };
