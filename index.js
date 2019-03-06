'use strict';

var express = require("express");
var app = express();
var path = require("path")
var bodyParser = require("body-parser");
var querystring = require('querystring');
var http = require('http');
var request = require('request');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Holds onto the authentication key for making requests through Spotify API
var token = {};



// Home page
app.get('/',function(req,res){
  getCredentials(req);
  res.sendFile(path.join(__dirname, '/index.html'));
});



// Request for data when user submit an artist/album/track keyword
app.post('/submit', function(req, res) { 
  getTracks(req.body.input).then(
    function(tracks) {
      var trackInfo = [];
      var items = tracks.tracks.items; 

      for (var t in items) {
          var artists = [];
          for (var a in items[t].artists ) {
            artists.push(items[t].artists[a].name);
          }

          trackInfo.push({'id':items[t].id,
                          'name': items[t].name,
                          'popularity':items[t].popularity,
                          'artists':artists});
      }



      res.send(trackInfo); 
    }, function(err) {
      console.log(err);
    });
});



// TODO: Create front end 404.html page to send
// 404 page
app.get('*', function(req, res) {
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



// Start server
if (process.env.PORT)
  console.log(`Server is now listening, go to http:\/\/localhost:${process.env.PORT}`);
else
  console.log('Server is now listening, go to http://localhost:8080');
app.listen(process.env.PORT || 8080);





var getCredentials = function (req) {    
  // Get authentification for using Spotify API
   var authOptions = {
     method: 'POST',
     url: 'https://accounts.spotify.com/api/token',
     headers: { 'Authorization': 'Basic ' + (new Buffer('d7038e13e0374e98916ccc5e3bfdf257' + ':' + '46ec9dccca394360a7b1a5e9423fc303').toString('base64')) },
     form: { grant_type: 'client_credentials' },
     json: true
   };

  request(authOptions, function (error, response, body) {
    if (error) {
      throw new Error(error);
    }
    
    token = body;
    console.log('The access token expires in ' + body['expires_in']);
    console.log('The access token is ' + body['access_token']);
  });
}


var getTracks = function(searchKey) { 
  // Options for request 
  var options = {
    url: 'https://api.spotify.com/v1/search?q=' + searchKey + '&type=track',
    headers: {
      'Authorization': 'Bearer ' + token.access_token
    },
    json: true
  };
  
  // Do the request!
  var promise = new Promise(function(resolve, reject) {
    request.get(options, function(error, response, body){
      resolve (body);
    })
  });  

  promise.then(function(data) {
    return data; 
  }, function(err) {
    console.log(err); 
    return [];
  });

  return promise;
   
}
