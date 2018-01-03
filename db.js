'use strict';

const mysql = require('mysql');
const settings = require('./settings.json');
const db = mysql.createPool(settings);

module.exports = db;