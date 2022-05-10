require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Router = require("./routes/admin.routes");
const PORT = process.env.PORT || 1337;

const app = express();

// parse the incoming form data
app.use(bodyParser.json());

// for url encoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ message: "Hello" });
});

// admin endpoint handler
app.use("/api/admin", Router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at port ` +PORT);
});
