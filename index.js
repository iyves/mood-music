'use strict';

var express = require('express');
var server = express();

server.get('/', function(req, res) {
  res.status(200);
  res.type('text/html');
  res.write('<!DOCTYPE html>');
    res.write('<html>');
      res.write('<body>');
        res.write("Hello World!");
      res.write('</body>');
    res.write('</html>');
  res.end();
});

server.get('*', function(req, res) {
  res.status(404);
  res.type('text/html');
  res.write('<!DOCTYPE html>');
    res.write('<html>');
      res.write('<body>');
        res.write("404: Page not found!");
      res.write('</body>');
    res.write('</html>');
  res.end();
});

server.listen(process.env.PORT || 8080);
