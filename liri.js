

var axios = require("axios");
var dotenv = require('dotenv').config();
var keys = require("./keys.js");
var spotify = require('node-spotify-api');

var userRequest = process.argv[2];
var userRequest2 = process.argv[3];

for (var i = 2; i < process.argv.length; i++) {
    userRequest += + process.argv[i];
}

var getArtist = function(songName) {
    if (songName === undefined) {
        songName = "Bye Bye Bye";
    }

    spotify.search({
        type: "track",
        request: userRequest
    })
}