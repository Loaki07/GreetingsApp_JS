const express = require("express");
const router = express.Router();

/**
 * Display Message at the homepage
 */
router.get("/", (req, res) => {
  res.send("Welcome to the Greetings App");
});

module.exports = router;
