

var axios = require("axios");
var dotenv = require('dotenv').config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs");


inquirer
    .prompt({
        name: "searchType",
        type: "list",
        message: " Hello! I'm Liri, your personal Node.js Assistant. What you like to do?",
        choices: ["Search for a Concert", "Spotify a Song", "Search for Movie Info", "Or Do what it says..."]
    }).then(function (answer) {
        if (answer.searchType === "Search for a Concert") {
            searchConcert();
        } else if (answer.searchType === "Spotify a Song") {
            spotifySong();
        } else if (answer.searchType === "Search for Movie Info") {
            searchMovie();
        } else if (answer.searchType === "Or Do what it says...") {
            doWhatItSays();
        }
    });

function spotifySong() {
    inquirer
        .prompt({
            name: "songSearch",
            type: "input",
            message: "Which song would you like to search for?"
        }).then(function (songAnswer) {
            spotify.search({ type: 'track', query: songAnswer.songSearch }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                // console.log(data);
                var songs = data.tracks.items;

                for (var i = 0; i < songs.length; i++) {
                    
                }
            });
        })
};


function searchMovie() {
    inquirer
        .prompt({
            name: "movieSearch",
            type: "input",
            message: "Which movie would you like info on?"
        }).then(function (movieAnswer) {
            axios.get("http://www.omdbapi.com/?t=" + movieAnswer.movieSearch + "&y=&plot=full&tomatoes=true&apikey=trilogy").then(function (response) {
                // console.log(response.data); 
                var movieInfo = response.data;

                console.log("Title: " + movieInfo.Title);
                console.log("Year: " + movieInfo.Year);
                console.log("Rated: " + movieInfo.Rated);
                console.log("IMDB Rating: " + movieInfo.imdbRating);
                console.log("Country: " + movieInfo.Country);
                console.log("Language: " + movieInfo.Language);
                console.log("Plot: " + movieInfo.Plot);
                console.log("Actors: " + movieInfo.Actors);
                console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);

            });


        })
};


function searchConcert() {
    inquirer
        .prompt({
            name: "concertSearch",
            type: "input",
            message: "Which concert(Artist) would you like to search for?"
        }).then(function (concertAnswer) {
            console.log(concertAnswer.concertSearch);
           return axios.get("https://rest.bandsintown.com/artists/" + concertAnswer.concertSearch + "/events?app_id=codingbootcamp")
        }).then(function (response) {
            var concert = response.data;
            for (var i = 0; i < concert.length; i++) {

                console.log("Venue: " + concert[i].venue.name);
                console.log(`Venue Location: ${concert[i].venue.city}, ${concert[i].venue.region}`);
                console.log("Date of Event: " + moment(concert[i].datetime).format("dddd, MMMM Do YYYY"));
            }


        });
};






function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
    
        var dataArr = data.split(",");
    
        if (dataArr.length === 2) {
          pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
          pick(dataArr[0]);
        }
      });
};