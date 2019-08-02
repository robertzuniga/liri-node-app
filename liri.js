require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var axios = require("axios");
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var myLiriRequest = process.argv[2];

switch (myLiriRequest) {
    case "concert-this":
        getBandsInTown();
        break;
    case "spotify-this-song":
        musicInfo();
        break;
    case "movie-this":
        movieInfo();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("default case ok");
}
////////////////////////////////////////////////////////////////////////////////
//        getBandsInTown  via "https://rest.bandsintown.com/
////////////////////////////////////////////////////////////////////////////////
function doWhatItSays() {
    console.log("do-what-it-says ok");
    // This block of code will read from the "movies.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        querySpotify(data[1]);
    });

}


////////////////////////////////////////////////////////////////////////////////
//        getBandsInTown  via "https://rest.bandsintown.com/
////////////////////////////////////////////////////////////////////////////////
function getBandsInTown() {
    // Grab or assemble the artis name and store it in a variable called "artist"
    var artistName = process.argv.slice(3).join('+');
    if (!artistName) {
        artistName = "imagine dragons";
    }
    // Then run a request  to the BandsInTown API with the artist specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    // console.log("queryUrl = ",queryUrl);
    // Then create a request with axios to the queryUrl
    axios.get(queryUrl).then(response => {

        // console.log(JSON.stringify(response.data, null, 4));

        for (var event of response.data) {
            var formattedEventDate = moment(event.datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY");
            console.log(``);
            console.log(`<> Lineup: ${event.lineup[0]}`);
            console.log(`<> Venue Name: ${event.venue.name}`);
            console.log(`<> Venue Location: ${event.venue.city}, ${event.venue.region}`);
            console.log(`<> Event Date: ${formattedEventDate}`);
            console.log(``);
        }
    })
}

////////////////////////////////////////////////////////////////////////////////
//        musicInfo   via https://www.npmjs.com/package/node-spotify-api
////////////////////////////////////////////////////////////////////////////////
function musicInfo() {
    // Grab or assemble the movie name and store it in a variable called "movieName
    //var movieName = process.argv[3];
    var songName = process.argv.slice(3).join('+')
    console.log('songName: ', songName);
    if (!songName) {
        songName = "the sign ace of base";
    }
    querySpotify(songName);

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
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

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


            var result = findCriticsScore('Rotten Tomators');

            // console.log(`${result.Source} Score: ${result.Value}`);
            console.log("");
            console.log("<> Movie Title: ", response.data.Title);
            console.log("<> Year: ", response.data.Year);
            console.log("<> Critic Rating(s): ");
            // console.log("<> IMDB Rating: ", response.data.imdbRating);
            // console.log(`<> : ", response.data.tomatoRating`);
            function findCriticsScore(name) {
                return response.data.Ratings.find(rating => {
                    return rating.Source === name;
                });
            }

            for (var critic of response.data.Ratings) {
                console.log(critic);
            }

            console.log("<> Country Produced: ", response.data.Country);
            console.log("<> Language: ", response.data.Language);
            console.log("<> Movie Plot: ", response.data.Plot);
            console.log("<> Actors: ", response.data.Actors);
            console.log("");
        });
}

function querySpotify(mySongName) {
    spotify.search({
        type: 'track',
        query: mySongName,
        limit: "1"
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }

        //** */        console.log(JSON.stringify(data, null, 4));

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
            console.log("sorry - can't find song - try again");
        }
        ////
    });

}