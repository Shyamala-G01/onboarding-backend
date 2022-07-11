require("dotenv").config();
const express = require("express");
const fileuplod=require('express-fileupload')
const bodyParser = require("body-parser");
const Router = require("./routes/admin.routes");
const AuthRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const PORT = process.env.PORT || 1337;
const app = express();

const cors = require("cors");
var corsOption = {
  origin: "http://localhost:4200",
};
app.use(fileuplod())

app.use(cors(corsOption));
// parse the incoming form data
app.use(bodyParser.json());
// for url encoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads',express.static(require('path').join('/home/diggiserveradmin/OnBoarding-Documnets')))
app.get("/", (req, res) => {
  res.send({ message: "Hello" });
});

// admin endpoint handler
app.use("/api", Router);

// auth
app.use("/api", AuthRouter);

// user
app.use("/api", userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at port ` + PORT);
});
