const http = require("http");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
// const port = process.env.PORT || 1337;

const app = express();

// parse the incoming form data
app.use(bodyParser.json());

// for url encoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get((req, res) => {
  res.json({ message: "Hello" });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ` + process.env.PORT);
});
