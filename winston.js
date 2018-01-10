'use strict';

const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    transports: [
        //
        // - write to all logs with level 'info' and below to 'combined.log'
        // - write all error logs (and below) to 'error.log
        //
        new winston.transports.File({ filename: '/log/error.log', level: 'error'}),
        new winston.transports.File({ filename: '/log/combined.log' })
    ]
});

//
// - if we're not in prod then log to console with the following format:
// - ` ${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'info',
        timestamp: true,
        format: winston.format.simple()
    }));
}

module.exports = logger;