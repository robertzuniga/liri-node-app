# liri-node-app
using node spotifyAPI and axios OMBD API and BandsInTown API

Packages used for LIRI app:
*dotenv
*axios
   -OMDB api
   -bands_in_town api
*node-spotify-api

-----------------------------------------------------------
`node liri.js concert-this <artist/band name here>`
-----------------------------------------------------------

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

-----------------------------------------------------------



-----------------------------------------------------------
`node liri.js spotify-this-song '<song name here>`
-----------------------------------------------------------

* This will show the following information about the song in your terminal/bash window

     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.
   * Utilizes the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

----------------------------------------------------------




-----------------------------------------------------------
`node liri.js movie-this '<movie name here>'`
-----------------------------------------------------------
   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

the `axios` package to retrieve data from the OMDB API.









Here is the movie-this jpg

example-

node liri.js movie-this terminator


![node liri.js movie-this terminator](https://raw.githubusercontent.com/robertzuniga/liri-node-app/master/images/movie-this.JPG)

Here is the spotify-this-song jpg

example-

node liri.js spotify-this-song immigrant


![node liri.js spotify-this-song](https://raw.githubusercontent.com/robertzuniga/liri-node-app/master/images/spotify-this-song.JPG)





