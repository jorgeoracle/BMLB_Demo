const http = require('http');
const hostname = 'hope';
const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/status') {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World - Response from Server 1 - Status\n');
  } else {
      if (req.url === '/echo') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World - Response from Server hope\n');
      } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Hello World - Response from Server hope - Error\n');
        }
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

