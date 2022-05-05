const http = require('http');
const port=process.env.PORT || 1337
const server = http.createServer((req, res) => {
res.statusCode = 200;

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "fullStack",
    password: "root@123"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
res.setHeader('Content-Type', 'text/html');
res.end('<h1>Hello World</h1>');
});
server.listen(port,() => {
console.log(`Server running at port `+port);
});