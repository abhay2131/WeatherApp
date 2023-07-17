const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
  // console.log(req.body.cityName);

  const apiKey = "f01ccccab03f09f240e93de1812e6a65";
  const city = req.body.cityName;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+ apiKey +"&units="+unit+"";
  https.get(url, function(response){
    console.log(response.statusCode);
     response.on('data', function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      const des = weatherData.weather[0].description;
      console.log(des);
      const icon = weatherData.weather[0].icon;
      console.log(icon)
      const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>the weather Description in " +city+ " is :" + des +" </p>");
      res.write("<h1>The weather in the " +city+ " is: " + temp +" C</h1>");
      res.write("<img src="+imgUrl +" alt'broken clouds'>");
      res.send();
    });
  });
});





app.listen(3000, function(){
  console.log(`Server is running in the port 3000 or 127.0.0.1:3000`);
});
