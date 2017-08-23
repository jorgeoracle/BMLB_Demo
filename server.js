const http = require('http');
const os = require ('os');
const hostname = os.hostname();
const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/status') {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World - Response from server '+hostname+' - Status\n');
  } else {
      if (req.url === '/echo') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World - Response from server '+hostname+ '\n');
      } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Hello World - Response from server '+hostname+' - Error\n');
        }
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

