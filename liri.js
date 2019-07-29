require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

var fs = require("fs");

var myLiriRequest = process.argv[2];


switch (myLiriRequest) {
    case "concert-this":
        console.log("concert-this ok");
        // http://rest.bankdsintown.com/
        break;
    case "spotify-this-song":
        // console.log("spotify-this-song ok");
        musicInfo();
        break;
    case "movie-this":
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
////////////////////////////////////////////////////////////////////////////////
//        musicInfo   via https://www.npmjs.com/package/node-spotify-api
////////////////////////////////////////////////////////////////////////////////
function musicInfo() {
    // Grab or assemble the movie name and store it in a variable called "movieName
    //var movieName = process.argv[3];
    var songName = process.argv.slice(3).join('+')
    if (!songName) {
        songName = "the sign ace of base";
    }
    spotify.search({
        type: 'track',
        query: songName,
        limit: "1"
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
 //       console.log("<== JSON data ==>");
 //       console.log(JSON.stringify(data.tracks.items[0], null, 2))
 //      console.log("data.tracks ==> ",data.tracks);
    //    console.log("data.tracks.items[0] ==> ");
    //    console.log(data.tracks.items[0]);
    //    console.log("data.tracks.items[0].artist ==> ");
    //    console.log(data.tracks.items[0].artists);
    //    console.log("data.tracks.items[0].name ==> ");
    //    console.log(data.tracks.items[0].name);
    //    console.log("data.tracks.items[0].preview_url ==> ");
    //    console.log(data.tracks.items[0].preview_url);
    //    console.log("data.tracks.items[0].album.name ==> ");
    //    console.log(data.tracks.items[0].album.name);

  //      console.log("data.tracks.items.length ==> ",data.tracks.items.length);

        if (data.tracks.items.length > 0) {
            // Uses first result
            var track = data.tracks.items[0];
            var artistsObj = track.artists;
            var artists = [];

            artistsObj.forEach(function (artist) {
                //  console.log("artist name ==>",artist.name);
                if (artist.type === "artist") {
                    artists.push(artist.name);
                }

            });
            var songName = track.name;
            var previewSpotifyLink = track.preview_url;
            var albumName = track.album.name;
            console.log("");
            console.log("<> Artist(s): " + artists.join(", "));
            console.log("<> Song Name: " + songName);
            console.log("<> Spotify Preview Link: " + previewSpotifyLink);
            console.log("<> Album: " + albumName);
            console.log("");
        } else {

            console.log("Song not found");

        }
        ////
    });

}


////////////////////////////////////////////////////////////////////////////////
//                  movieInfo   via https://www.omdbapi.com/
////////////////////////////////////////////////////////////////////////////////
function movieInfo() {

    // Grab or assemble the movie name and store it in a variable called "movieName
    //var movieName = process.argv[3];
    var movieName = process.argv.slice(3).join('+')
    if (!movieName) {
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
            // ​console.log(JSON.stringify(data, null, 2));
            // Then log the Release Year for the movie
            // console.log(response.data.Released);
            //console.log(response);
            console.log("");
            console.log("<> Movie Title: ", response.data.Title);
            console.log("<> Year: ", response.data.Year);
            console.log("<> IMDB Rating: ", response.data.imdbRating);
            console.log("<> Rotten Tomato Rating: ", response.data.tomatoRating);
            console.log("<> Country Produced: ", response.data.Country);
            console.log("<> Language: ", response.data.Language);
            console.log("<> Movie Plot: ", response.data.Plot);
            console.log("<> Actors: ", response.data.Actors);
            console.log("");
        });
}