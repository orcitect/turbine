'use strict';

const mysql = require('mysql');
const settings = require('./settings.json');
const db = mysql.createPool(settings);
const log = require('./log');

db.on('connection', function (connection) {
    log.info('DB connection established');
});

module.exports = db;