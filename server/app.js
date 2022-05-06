const http = require("http");
const port = process.env.PORT || 1337;
var mysql = require("mysql");
  var con = mysql.createConnection({
    host: "onboarding-backend.southindia.cloudapp.azure.com",
    port:3306,
    user: "root",
    password: ""
  });

  con.connect(function (err) {
   
    if (err) {
      console.log(err);
    } else {
      console.log("Connected!");
    }
  });
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello World</h1>");
});
server.listen(port, () => {
  console.log(`Server running at port ` + port);
});
