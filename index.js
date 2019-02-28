'use strict';

var express = require('express');
var server = express();
var http = require("http");
var SpotifyWebApi = require('spotify-web-api-node');

// Wrapper for Spotify api
// cliend id and secret obtained by registering this app on spotify's website for developers
var spotifyApi = new SpotifyWebApi({ 
    clientId: 'd7038e13e0374e98916ccc5e3bfdf257',
    clientSecret: '46ec9dccca394360a7b1a5e9423fc303',
    redirectUri: '/'
});

// Authenitcation using the Client Credential flow strategy, doesn't require user permissions
// OAuth Access token obtained from requesting in the spotify console docs
spotifyApi.setAccessToken('BQDU169PlPhvP3Jf9K_fFkl6QZlFXtcUclcm_h8i-3OSJyqxEMDnVRlAHqH3Bvz4Qla8FWqnRaH-scJRhCgOxAU4lVuQgUvF4onsSEzrhevPUgzUyDAYpbu7Fnv3gKVM7Eg6xmo77WCQbk04pnFKtTMYnC238yT7Rw');


server.get('/', function(req, res) {
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
