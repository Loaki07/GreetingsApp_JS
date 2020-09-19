const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const greetingsRoute = require("../routes/greetings");
const homepageRoute = require("../routes/homepage");

// Middleware
app.use(bodyParser.json());
app.use("/", homepageRoute);
app.use("/greetings", greetingsRoute);

/**
 * Using a port if defined in the system env else using 3000
   And listening to it respectively 
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
