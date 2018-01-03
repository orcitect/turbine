'use strict';

const cluster = require('cluster');
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const logger = require('./logger');
const corsOptions = { origin: 'http://localhost' };


if (cluster.isMaster) {
  masterProcess();
} else {
  workerProcess();
}


function masterProcess() {
  logger.info(`Mode: ${app.settings.env}`);
  logger.info(`Master PID: ${process.pid}`);

  const cpuCount = require('os').cpus().length;

  // fork workers
  for (let i = 0; i < cpuCount; i++) {
    logger.info(`Forking process ${i}...`);
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => logger.info(`Worker ${cluster.worker.id} died`))

}


function workerProcess() {

  app.get('/', (req, res) => res.send('Hello from worker ' + cluster.worker.id))


  app.get('/api/casinoid', function (req, res) {
    db.getConnection(function(err, connection) {
      if (err) {
        logger.error(err);
        res.json({ "code": 500, "status": "Error in connection database" });
        return;
      }
      connection.query('SELECT * FROM nerd;', function (error, results, fields) {
        logger.debug('API CALL: /api/casinoid, connection id: ' + connection.threadId)
        connection.release();
        res.json(results);
      });
    });
  });

  app.get('/api/casinoid/:casinoid', function (req, res) {
    db.getConnection(function(err, connection) {
      if (err) {
        logger.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      connection.query('SELECT * FROM nerd WHERE casinoid=?;', [req.params.casinoid], function (error, results, fields) {
        logger.debug('API CALL: /api/casinoid/, connection id: ' + connection.threadId)
        connection.release();
        res.json(results);
      });
    });
  });

  app.get('/api/jurisdiction/:jurisdiction', function (req, res) {
    db.getConnection(function(err, connection) {
      if (err) {
        logger.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      connection.query('SELECT * FROM nerd WHERE jurisdiction=?;', [req.params.jurisdiction], function (error, results, fields) {
        logger.verbose('API CALL: /api/jurisdiction/, connection id: ' + connection.threadId)
        connection.release();
        res.json(results);
      });
    });
  });

  app.listen(80, "0.0.0.0", () => logger.info(`Worker ${process.pid} started`))

}
