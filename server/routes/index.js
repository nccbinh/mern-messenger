/**
 * Routes Index
 * @author Binh Nguyen
 * @since 0.0.1
 */
const express = require("express");
const router = express.Router();

/**
 * API routes declaration
 */
router.use("/api", require("./api"));

module.exports = router;
