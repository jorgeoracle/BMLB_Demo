
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js'); 

const http = require('http');
const os = require ('os');
const fs = require ('fs');
const hostname = os.hostname();
const port = 8080;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/status' :
      fs.readFile("./html/hello.html", function (err, data) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end('Hello World - Response from server '+hostname+' - Status\n');
       });
      break;
    case '/echo' : 
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World - Response from server '+hostname+ '\n');
      break;
    case '/sql' : 
      oracledb.getConnection (
        {
          user : dbConfig.user,
          password : dbConfig.password,
          connectString : dbConfig.connectString
        }, 
        function (err, connection) {
          if (err) {
            console.error (err.message);
            return;
          }
          connection.execute (
            "select department_id, department_name " +
            "from departments ",
            function (err, result) {
              if (err) {
                console.error (err.message);
                connection.close;
                return;
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/json');
              res.write(JSON.stringify (result.metaData));
              res.write(JSON.stringify (result.rows));
              res.end('Hello World - Response from server '+hostname+ ' - SQL\n');
              connection.close;
              
            } // End of handler
           
          ) // End of connection.execute
        } // End of handler
      ); // End of getConnection
      break;
    default :  
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World - Response from server '+hostname+' - Error\n');
  } // End of switch
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

