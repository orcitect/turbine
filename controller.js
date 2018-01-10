'use strict';

const db = require('./db');
const log = require('./log');
const cluster = require('cluster');

module.exports = {

    getIndex : function(req, res){
        res.send('Hello from worker ' + cluster.worker.id);
    },

    getAll : function(req, res){
        db.getConnection(function(err, connection) {
            connection.query('SELECT * FROM nerd;', function (error, results, fields) {
                log.info('API CALL: /api/casinoid, connection id: ' + connection.threadId)
                connection.release();
                res.json(results);
            });
        });
    },

    getCID : function(req, res){
        db.getConnection(function(err, connection) {
            if (err) {
                res.json({"code": 100, "status": "error in connection database"});
                return;
            }
            connection.query('SELECT * FROM nerd WHERE casinoid=?;', [req.params.name], function (error, results, fields) {
                log.info('API CALL: /api/casinoid/, connection id: ' + connection.threadId)
                connection.release();
                res.json(results);
            });
        });
    },

    getADP : function(req, res){
        db.getConnection(function(err, connection) {
            if (err) {
                res.json({"code": 100, "status": "error in connection database"});
                return;
            }
            connection.query('SELECT * FROM nerd WHERE prodadp=?', [req.params.value], function (error, results, fields) {
                log.info('API CALL: /api/prodadp/:value, connection id: ' + connection.threadId)
                connection.release();
                res.json(results);
            });
        });
    },

    getJDX : function(req, res){
        db.getConnection(function(err, connection) {
            if (err) {
                res.json({"code": 100, "status": "error in connection database"});
                return;
            }
            connection.query('SELECT * FROM nerd WHERE jurisdiction=?;', [req.params.jdx], function (error, results, fields) {
                log.info('API CALL: /api/jurisdiction/, connection id: ' + connection.threadId)
                connection.release();
                res.json(results);
            });
        });
    }
}