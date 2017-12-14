var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var client = new Twitter(keys);
// var spotify = new Spotify({
//   id: d7a1d2f7ddaf4e8191a634715e65bef2,
//   secret: c916cefaf6c3442ba3040f2b8f6eb7d3
// });

//arguments 
var nodeArgs = process.argv;
var action = process.argv[2];


// variable for input
var userInput = "";

// Loop through all the words
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    userInput = userInput + "+" + nodeArgs[i];

  }

  else {

    userInput += nodeArgs[i];

  }
}



switch (action) {
  case "movie-this":
    omdb();
    break;

  case "my-tweets":
  	theTweets();
  	break;

  case "spotify-this-song":
  	searchSong();
  	break;
}


function omdb(){
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
}

function theTweets(){
	console.log("theTweets are here")
	var params = {screen_name: 'jahjahblue'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) {
			console.log(error);
		}
  		if (!error) {
  		for(var i = 0; i<tweets.length; i++){
    		console.log(tweets[i].text + tweets[i].created_at);
       
    		
  }
}
});
}

function searchSong(){
var spotify = new Spotify({
  id: 'd7a1d2f7ddaf4e8191a634715e65bef2',
  secret: 'c916cefaf6c3442ba3040f2b8f6eb7d3'
});

var songChoice = userInput;
console.log(songChoice);
if (songChoice === ""){
    songChoice = "The Sign";

}
  spotify.search({ type: 'track', query: songChoice}, function(err, data) {
  if (!err) {
    console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong: " + data.tracks.items[0].name + "\nPreview URL: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name);
  }

  
});
}







