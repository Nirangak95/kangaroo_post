const dotenv = require('dotenv');

const loadEnvironmentConfig = () => {
    dotenv.config({
        path: (() => {
            switch (process.env.NODE_ENV) {
                case 'test':
                    return '.env.test';
                case 'prod':
                    return '.env.prod';
                default:
                    return '.env.test';
            }
        })()
    });
};

module.exports = loadEnvironmentConfig;
