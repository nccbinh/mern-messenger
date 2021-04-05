/**
 * API Routes Index
 * @author Binh Nguyen
 * @since 0.0.1
 */
const express = require('express');
const router = express.Router();

/**
 * Routes declaration
 */
router.use('/ping', require('./ping'));
router.use('/user', require('./user'));
router.use('/conversation', require('./conversation'));

module.exports = router;