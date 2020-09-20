const Joi = require("joi");

const greetingMsgs = [
  { id: 1, greeting: "Hello World!" },
  { id: 2, greeting: "Welcome to server Testing" },
  { id: 3, greeting: "Testing Messages ..." },
];

class Greeting {
  /**
   * Display the all the messages in /greetings
   */
  displayAllGreetings = (req, res) => {
    res.send(greetingMsgs);
  };

  /**
   * Upload a new greeting message
   */
  uploadNewGreeting = (req, res) => {
    const { error } = this.validateMsg(req.body);
    // 400 Bad request
    if (error) return res.status(400).send(error.details[0].message);

    const message = {
      id: greetingMsgs.length + 1,
      greeting: req.body.greeting,
    };

    greetingMsgs.push(message);
    res.send(message);
  };

  /**
   * Update existing greeting message
   */
  updateGreeting = (req, res) => {
    // Looking for the greeting
    // If not found, returns 404 - Not Found
    const message = greetingMsgs.find(
      (greeting) => greeting.id === parseInt(req.params.id)
    );
    if (!message)
      return res.status(404).send("The greeting with the given ID was not found");

    // Validate the greeting to be updated
    // If invalid, returns 400 - Bad request
    const { error } = this.validateMsg(req.body);
    // 400 Bad Request
    if (error) return res.status(400).send(error.details[0].message);

    // Update the greeting
    message.greeting = req.body.greeting;
    res.send(message);
  };

  /**
   * Deleted a greeting message
   */
  deleteGreeting = (req, res) => {
    const message = greetingMsgs.find(
      (greeting) => greeting.id === parseInt(req.params.id)
    );
    if (!message)
      return res.status(404).send("The greeting with the given ID was not found");

    // Delete
    const index = greetingMsgs.indexOf(message);
    greetingMsgs.splice(index, 1);

    // Return the same message
    res.send(message);
  };

  /**
   * Function to validate message for the required conditions
   * @param {*} message
   */
  validateMsg = (message) => {
    const schema = Joi.object({
      greeting: Joi.string().min(3).required(),
    });
    return schema.validate(message);
  };
}

module.exports = Greeting;
