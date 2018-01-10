'use strict';

const express = require('express');
const cascontrol = require('./controller');
const router  = express.Router();

router.route('/').get(cascontrol.getIndex);
router.route('/casinoid').get(cascontrol.getAll);
router.route('/casinoid/:name').get(cascontrol.getCID);
router.route('/jurisdiction/:jdx').get(cascontrol.getJDX);
router.route('/prodadp/:value').get(cascontrol.getADP);

module.exports = router;