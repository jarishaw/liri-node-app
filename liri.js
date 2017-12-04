var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

//OMDB 
var nodeArgs = process.argv;

// variable for movie name
var userInput = "";

// Loop through all the words
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

    userInput = userInput + "+" + nodeArgs[i];

  }

  else {

    userInput += nodeArgs[i];

  }
}

//request to the OMDB API 
var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece";

console.log(queryUrl);

//request to the queryUrl
request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("Movie Title: " + JSON.parse(body).Title,"\nRelease Year: " + JSON.parse(body).Year,"\nIMDB Rating: " + JSON.parse(body).imdbRating,
    	"\nCountry: " + JSON.parse(body).Country,"\nLanguage: " + JSON.parse(body).Language,"\nPlot: "+ JSON.parse(body).Plot,"\nActors: " + JSON.parse(body).Actors);
  }
});