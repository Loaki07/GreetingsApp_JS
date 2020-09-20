const express = require("express");
const router = express.Router();
const controller = require("../controller/greeting");
const GreetingController = new controller();

router.get("/", GreetingController.displayAllGreetings);

router.post("/", GreetingController.uploadNewGreeting);

router.put("/:id", GreetingController.updateGreeting);

router.delete("/:id", GreetingController.deleteGreeting);

module.exports = router;
