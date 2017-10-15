const express = require('express');
const files = require('./files');
const profile = require('./profile');

const router = express.Router();

router.use('/profile', profile);
router.use('/file', files);

module.exports = router;
