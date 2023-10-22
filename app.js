const express = require('express' );
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/html.html")
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const units ="metric";
    const apikey ="72b99b48de4f5799a577aad51829d75e";
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units + "";
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp =  weatherData.main.temp;
            const what_it_feels_like = weatherData.main.feels_like;
            const wind_speed= weatherData.wind.speed;
            const country_code = weatherData.sys.country;
            const humidity = weatherData.main.humidity;
            const lat = weather.coord.lat;
            const lon = weather.coord.lon;
            const visibility = weatherData.visibility;
            const rain = weatherData.main.rain3h;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            
            
    

                    

            res.write("<h1> The Temperature in " + query + " is " + temp + " Celsius </h1>");
            res.write("<h2> The Weather is " + description + "</h2>");
            res.write("<h2> The Weather feels like " + what_it_feels_like + "</h2>");
            res.write("<h2> The Wind Speed is " + wind_speed + "m/s </h2>");
            res.write("<h2>Coords: " + "longitude:" + lon + " " + "latitude:" + lat + "</h2>");
            res.write("<h2> The Visibility is " + visibility + "km </h2>");
            res.write("<h2> The volume of the rain for 3h is " + rain + "m </h2>");
            res.write("<h2> The Country Code is " + country_code + "</h2>");
            res.write("<h2> The Humidity is " + humidity + "</h2>");
            res.write("<img src="+ imageUrl + ">");        
            res.send();
        })
    });
});

app.listen(3000, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log("Server OK");
});