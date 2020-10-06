const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const path = require("path");
const fetch = require("node-fetch");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
const { strictEqual } = require("assert");
const { count } = require("console");
app.use(cors());
app.use(express.static("dist"));

let savedTrips = [];
// GeoNames API
const geoURL1 = "http://api.geonames.org/searchJSON?name_startsWith=";
const geoURL2 = "&country=";
const geoURL3 = "&maxRows=10&username=";
const geoKey = process.env["GEO_KEY"];
let geo;

// Weatherbit API
const weatherURL1 = "http://api.weatherbit.io/v2.0/forecast/daily?&lat=";
let lat;
const weatherURL2 = "&lon=";
let lon;
const weatherURL3 = "&key=";
const weatherKey = process.env.WEATHERBIT_KEY;
let weatherURL;

//Pixabay API
const pixURL1 = "https://pixabay.com/api/?key=";
const pixKey = process.env.PIX_KEY + "&q=";
const pixURL2 = "&image_type=photo&pretty=true";
let pix;

const port = process.env.PORT || 5500;
const server = app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
module.exports = server; // To use in with testing.

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.post("/geoNames", async (req, res) => {
  geo = geoURL1 + req.body.city + geoURL2 + req.body.country + geoURL3 + geoKey;
  const response = await fetch(geo);

  try {
    const newData = await response.json();
    lon = newData.geonames[0].lng;
    lat = newData.geonames[0].lat;
    console.log("Success GeoNames API.");
    res.send(newData);
  } catch (error) {
    console.log(error);
  }
});

app.post("/weatherBit", async (req, res) => {
  weatherURL = weatherURL1 + lat + weatherURL2 + lon + weatherURL3 + weatherKey;
  const weatherResponse = await fetch(weatherURL);

  try {
    const weatherData = await weatherResponse.json();
    console.log("Success WeatherBit API.");
    res.send(weatherData);
  } catch (error) {
    console.log(error);
  }
});

app.post("/pix", async (req, res) => {
  pix = pixURL1 + pixKey + req.body.city + pixURL2;
  const weatherResponse = await fetch(pix);

  try {
    const pixData = await weatherResponse.json();
    console.log("Success Pixabay API.");
    res.send(pixData);
  } catch (error) {
    console.log(error);
  }
});
