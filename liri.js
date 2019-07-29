require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var axios = require("axios");

//var spotify = new Spotify(keys.spotify);

var fs = require("fs");

var myLiriRequest = process.argv[2];


switch (myLiriRequest) {
    case "concert-this":
        console.log("concert-this ok");
        // http://rest.bankdsintown.com/
        break;
    case "spotify-this-song":
        console.log("spotify-this-song ok");
        break;
    case "movie-this":
        // console.log("movie-this ok");
        movieInfo();        
        // http://www.omdbapi.com/?apikey=[yourkey]&
        // https://www.omdbapi.com/

        break;
    case "do-what-it-says":
        console.log("do-what-it-says ok");
        break;
    default:
        console.log("default case ok");
}

// Move info https://www.omdbapi.com/
function movieInfo(){

    // Grab or assemble the movie name and store it in a variable called "movieName
//var movieName = process.argv[3];
var movieName = process.argv.slice(3).join('+')
if (!movieName){
movieName = "mr nobody";
}

// Then run a request with axios to the OMDB API with the movie specified
 var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";;

//var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&apikey=trilogy";;

// console.log("queryUrl = ",queryUrl);
// Then create a request with axios to the queryUrl
axios.get(queryUrl)
  // If the request with axios is successful
  .then(function (response) {
    if (response.data.Error) {
      return console.log("Oops, there was a problem: " + response.data.Error);
    }
// ​    console.log(JSON.stringify(data, null, 2));
    // Then log the Release Year for the movie
    // console.log(response.data.Released);
     //console.log(response);
    console.log("Movie Title: ",response.data.Title);
    console.log("Year: ",response.data.Year);
    console.log("IMDB Rating: ",response.data.imdbRating);
     console.log("Rotten Tomato Rating: ",response.data.tomatoRating);
    console.log("Country Produced: ",response.data.Country);
    console.log("Language: ",response.data.Language);
    console.log("Movie Plot: ",response.data.Plot);
    console.log("Actors: ",response.data.Actors);
  });
}