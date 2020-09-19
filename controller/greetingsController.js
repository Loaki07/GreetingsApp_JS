const Joi = require("joi");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(bodyParser.json());

const greetingMsgs = [
  { id: 1, greeting: "Hello World!" },
  { id: 2, greeting: "Welcome to server Testing" },
  { id: 3, greeting: "Testing Messages ..." },
];

/**
 * Display Message at the homepage
 */
app.get("/", (req, res) => {
  res.send("Welcome to the Greetings App");
});

/**
 * Display the all the messages in /greetings
 */
app.get("/greetings", (req, res) => {
  res.send(greetingMsgs);
});

/**
 * Upload a new greeting message
 */
app.post("/greetings", (req, res) => {
  const { error } = validateMsg(req.body);
  // 400 Bad Request
  if (error) return res.status(400).send(error.details[0].message);

  const message = {
    id: greetingMsgs.length + 1,
    greeting: req.body.greeting,
  };

  greetingMsgs.push(message);
  res.send(message);
});

/**
 * Update existing greeting message
 */
app.put("/greetings/:id", (req, res) => {
  // Looking for the greeting
  // If not found, returns 404 - Not Found
  const message = greetingMsgs.find(
    (greeting) => greeting.id === parseInt(req.params.id)
  );
  if (!message)
    return res.status(404).send("The greeting with the given ID was not found");

  // Validate the greeting to be updated
  // If invalid, returns 400 - Bad request
  const { error } = validateMsg(req.body);
  // 400 Bad Request
  if (error) return res.status(400).send(error.details[0].message);

  // Update the greeting
  message.greeting = req.body.greeting;
  res.send(message);
});

/**
 * Using a port if defined in the system env else using 3000
   And listening to it respectively 
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

function validateMsg(message) {
  const schema = Joi.object({
    greeting: Joi.string().min(3).required(),
  });
  return schema.validate(message);
}
