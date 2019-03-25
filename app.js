

var axios = require("axios");
var dotenv = require('dotenv').config();
const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
var result = dotenv.config()
 
if (result.error) {
  throw result.error
}
var spotify = require('node-spotify-api');