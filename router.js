'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/').get(controller.index);
router.route('/casinoid').get(controller.all);
router.route('/casinoid/:name').get(controller.casino);
router.route('/jurisdiction/:jdx').get(controller.jdx);
router.route('/prodadp/:value').get(controller.adapter);

module.exports = router;