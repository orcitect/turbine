// server.js

'use strict';


const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const logger = require('./logger')
const corsOptions = { origin: 'http://localhost' };


if (cluster.isMaster) {
  masterProcess();
} else {
  workerProcess();
}


function masterProcess() {
  logger.info(`Master ${process.pid} is running in %s mode`, app.settings.env);

  // fork workers
  for (let i = 0; i < cpuCount; i++) {
    logger.info(`Forking process number ${i}...`);
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => logger.info(`Worker ${worker.process.id} died`))

}


function workerProcess() {

  // routes

  app.get('/', (req, res) => res.send('Hello from worker ' + cluster.worker.id))

  app.get('/api/casinoid/:casinoid', function (req, res) {
    db.getConnection(function(err, connection) {
      if (err) {
        logger.debug(err);
        return;
      }
      connection.query('SELECT * FROM nerd WHERE casinoid=?;', [req.params.casinoid], function (error, results, fields) {
        logger.debug('API CALL: /api/casinoid/:casinoid')
        connection.release();
        res.json(results);
      });
    });
  });

  app.get('/api/jurisdiction/:jurisdiction', function (req, res) {
    db.getConnection(function(err, connection) {
      if (err) {
        logger.debug(err);
        return;
      }
      connection.query('SELECT * FROM nerd WHERE jurisdiction=?;', [req.params.jurisdiction], function (error, results, fields) {
        connection.release();
        res.json(results);
      });
    });
  });

  // create server
  app.listen(80, "0.0.0.0", () => logger.info(`Worker ${process.pid} started`))

}
