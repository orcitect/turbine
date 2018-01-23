'use strict';

const cluster  = require('cluster');
const log      = require('./log');
const cpuCount = require('os').cpus().length;
const express  = require('express');
const app      = express();
const routes   = require('./router');


if (cluster.isMaster) {
  masterProcess();
} else {
  workerProcess();
}


function masterProcess() {
  log.info(`Master control process running: PID=${process.pid}`);

  for (let i = 0; i < cpuCount; i++) {
    log.info(`Forking process ${i}...`);
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => log.info(`Worker ${cluster.worker.id} died`));
}

function workerProcess() {
  app.use('/api', routes);
  app.listen(80, "0.0.0.0", () => log.info(`Worker ${process.pid} started (${app.settings.env})`));
}
