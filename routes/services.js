const express = require("express");
const router = express.Router();
const controller = require("../controller/service");
const ServiceController = new controller();

router.get("/", ServiceController.displayAllGreetings);

router.post("/", ServiceController.uploadNewGreeting);

router.put("/:id", ServiceController.updateGreeting);

router.delete("/:id", ServiceController.deleteGreeting);

module.exports = router;
