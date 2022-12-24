const express = require("express");
const https = require("https");
const { send } = require("process");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {

  res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {

  const query = req.body.cityName;
  const appid = "";                                       //put the app id here!!!!!!!!!!!!!!!!!!!!
  const units = "metric";
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + "&appid=" + appid + "&units=" + units;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) { //when we receive some data in the respose we are going to contain that data in a function
      const weatherData = JSON.parse(data); //changing the data form hexadecimal code to javaScipt object
      console.log(weatherData);

      const temprature = weatherData.main.temp;
      console.log(temprature);

      const weatherDescription = weatherData.weather[0].description; // weather was the first object in the data block that way [0]
      console.log(weatherDescription);

      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The temprature in " + query + " is " + temprature + "</p>");
      res.write("<h1>The wether is " + weatherDescription + "</h1>");
      res.write("<image src = " + imageUrl + ">");
      res.send();

    })
  })
})


app.listen(3000, function () {
  console.log("The server is running at port 3000");
})

