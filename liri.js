

var axios = require("axios");
var dotenv = require('dotenv').config();
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var inquirer = require("inquirer");
// var spotify = new Spotify(keys.spotify);


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
                console.log(data);
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
            axios.get("http://www.omdbapi.com/?t=" + movieAnswer.movieSearch + "&y=&plot=full&tomatoes=true&apikey=trilogy")
        }).then(function (response) {
            // console.log(movieAnswer.movieSearch);
            console.log(response);
        })
};


function searchConcert() {
    inquirer
        .prompt({
            name: "concertSearch",
            type: "input",
            message: "Which concert(Artist) would you like to search for?"
        }).then(function (concertAnswer) {
            axios.get("https://rest.bandsintown.com/artists/" + concertAnswer + "/events?app_id=codingbootcamp")
        }).then(function (response) {
            console.log(response);
        })
};

function doWhatItSays() {
    fs.readFile("random.txt", "uft8", function(err, data) {
        var dataArr = data.split(",");

        
        
    });
};