require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

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
        console.log("movie-this ok");        
        // http://www.omdbapi.com/?apikey=[yourkey]&
        // https://www.omdbapi.com/

        break;
    case "do-what-it-says":
        console.log("do-what-it-says ok");
        break;
    default:
        console.log("default case ok");
}