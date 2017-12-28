// db.js

'use strict';

const mysql = require('mysql')

const db = mysql.createPool({
    host: 'cha-nerd-01.nix.csmodule.com',
    user: 'nerd_ext',
    password: 'Netent4ever!',
    database: 'nerd',
    port: 3306,
    connectionLimit: 20
});

module.exports = db;