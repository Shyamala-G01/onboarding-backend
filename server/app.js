const http = require("http");
const port = process.env.PORT || 1337;
var mysql = require("mysql");
  var con = mysql.createConnection({
    host: "localhost",
    user: "fullStack",
    password: "root@123",
    database:"ON_BOARDING"
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM roles", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello World</h1>");
});
server.listen(port, () => {
  console.log(`Server running at port ` + port);
});
