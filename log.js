'use strict';

var bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: 'turbine',
    stream: process.stdout,
    level: 'info'
});

module.exports = log;