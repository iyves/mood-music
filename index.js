'use strict';

var express = require('express');
var server = express();
var path = require("path")
var http = require("http");
var router = express.Router();
const bodyParser = require('body-parser');

var url = require('url'); // do not change this line
var querystring = require('querystring'); // do not change this line


server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '')));


/*
var SpotifyWebApi = require('spotify-web-api-node');

// Wrapper for Spotify api
// cliend id and secret obtained by registering this app on spotify's website for developers
var spotifyApi = new SpotifyWebApi({ 
    clientId: 'd7038e13e0374e98916ccc5e3bfdf257',
    clientSecret: '46ec9dccca394360a7b1a5e9423fc303',
    redirectUri: '/'
});

// Authentication using the Client Credential flow strategy, doesn't require user permissions
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);
*/

router.post('/', function(req, res) {
    res.sendFile('/index.html');
    res.send();
});

server.get('/back', function(req, res) {
  res.status(200);
  res.type('text/plain'); 
 var query = url.parse(req.url, true).query;
  
  console.log('Went into request: ' + query['search'])
  ;
  router.post('/', function(req, res) {
      res.sendFile('/index.html');
      res.send();
  });
  /* 
  spotifyApi.searchTracks('Love')
    .then(function(data) {
      console.log('Search by "Love"\n', data.body.tracks.items);
      var items = data.body.tracks.items;
      res.write('<table border="1">');
        res.write('<tr><th>#</th><th>name</th><th>id</th><th>artist</th></tr>');
        for(var i in items) {
            res.write('<tr>');
              res.write('<td>' + i + '</td>');
              res.write('<td>' + items[i].album.name + '</td>');
              res.write('<td>' + items[i].album.id + '</td>');
              res.write('<td>' + items[i].album.artists[0].name + '</td>');
            res.write('<tr>');
        }
      res.write('</table>');
      res.end(); // res.end() moved here, after response is completed
    }, function(err) {
      console.error(err);
    });
      */
});


server.get('/form', function(req, res) {
  res.status(200);
  res.type('text/html');
  res.write('<!DOCTYPE html>');
    res.write('<html>');
      res.write('<body>');
  
        // Get request for tracks with 'Love' in the name, album or artist field
        spotifyApi.searchTracks('Love')
          .then(function(data) {
            console.log('Search by "Love"\n', data.body.tracks.items);
            
            var items = data.body.tracks.items;
            res.write('<table border="1">');
              res.write('<tr><th>#</th><th>name</th><th>id</th><th>artist</th></tr>');
              for(var i in items) {
                  res.write('<tr>');
                    res.write('<td>' + i + '</td>');
                    res.write('<td>' + items[i].album.name + '</td>');
                    res.write('<td>' + items[i].album.id + '</td>');
                    res.write('<td>' + items[i].album.artists[0].name + '</td>');
                  res.write('<tr>');
              }
            res.write('</table>');
            res.end(); // res.end() moved here, after response is completed
          }, function(err) {
            console.error(err);
          });

        res.write("Hello World!"); // Notice how this is written to the document before the table is
      res.write('</body>');
    res.write('</html>');
    // Notice - no res.end() here because the response from GET requests comes after page is loaded
});

server.get('*', function(req, res) {
  res.status(404);
  console.log("ah");
  res.type('text/html');
  res.write('<!DOCTYPE html>');
    res.write('<html>');
      res.write('<body>');
        res.write("404: Page not found!");
      res.write('</body>');
    res.write('</html>');
  res.end();
});

if (process.env.PORT)
  console.log(`Server is now listening, go to http:\/\/localhost:${process.env.PORT}`);
else
  console.log('Server is now listening, go to http://localhost:8080');
server.listen(process.env.PORT || 8080);
