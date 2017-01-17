//define the global variables
//current weather URL
var BASE_URL = "http://api.openweathermap.org/data/2.5/weather?";
var UrlParams = "&units=metric&mode=json";
// forecast URL
var Forecast_URL = "http://api.openweathermap.org/data/2.5/forecast?";
var ForeCast_Params = "&cnt=40&units=metric&mode=json";
// Image base URL
var IMG_URL = "http://openweathermap.org/img/w/";

/* Initial function call to determine the user location using GeoLocation API */
function getLocation() {
	if (navigator.geolocation) {
		var timeoutVal = 10 * 1000 * 1000;
		//enable below line to identify user's current geographical position. To display weather location for current user's city please modify the BASE_URL's
		//with the obtained latitude and longitude cordinates
		//navigator.geolocation.getCurrentPosition(showPosition);
		navigator.geolocation.getCurrentPosition(getCurrentWeatherData,
				displayError, {
					enableHighAccuracy : true,
					timeout : timeoutVal,
					maximumAge : 0
				});
	} else {
		alert("Geolocation is not supported by this browser");
	}
}

function showPosition(position) {
    alert("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude); 
}

// get the Current Weather for User location
function getCurrentWeatherData(position) {
	// Build the OpenAPI URL for current Weather
	var WeatherNowAPIurl = BASE_URL + "q=Edinburgh,uk&appid=c9d49310f8023ee2617a7634de23c2aa" + UrlParams;
	var WeatherForecast_url = Forecast_URL + "q=Edinburgh,uk&appid=c9d49310f8023ee2617a7634de23c2aa" + ForeCast_Params;
	// OpenWeather API call for Current Weather
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var JSONobj = JSON.parse(xmlhttp.responseText);
			Parse(JSONobj);
		}
	}
	xmlhttp.open("GET", WeatherNowAPIurl, true);
	xmlhttp.send();

	// OpenWeather API call for Forecast Weather
	var xmlhr = new XMLHttpRequest();
	xmlhr.onreadystatechange = function() {
		if (xmlhr.readyState == 4 && xmlhr.status == 200) {
			var JSobj = JSON.parse(xmlhr.responseText);
			Forecast(JSobj);
		}
	}
	xmlhr.open("GET", WeatherForecast_url, true);
	xmlhr.send();

}
// Error Handler
function displayError(error) {
	var errors = {
		1 : 'Permission denied',
		2 : 'Position unavailable',
		3 : 'Request timeout'
	};
	alert("Error: " + errors[error.code]);
}
// display the current weather and location

function Parse(obj) {
	// current Location
	document.getElementById("location").innerHTML = "Country :"
			+ obj.sys.country + "<br>" + "City :" + obj.name + "<br>"
			+ "Latitude:" + obj.coord.lat + "<br>" + "Longitude:"
			+ obj.coord.lon + "<br>";

	// current weather
	document.getElementById("weatherNow").innerHTML = "<img src='" + IMG_URL
			+ obj.weather[0].icon + ".png'> " + "<br> Condition:"
			+ obj.weather[0].description + "<br>" + "Temp:" + obj.main.temp
			+ " C<br>" + "Humidity:" + obj.main.humidity + " hPa <br>"
			+ "Cloudiness:" + obj.clouds.all + "% <br>" + "Wind:"
			+ obj.wind.speed + " mps <br>";

}
// display forecasts for next 5 Days
function Forecast(obj) {
	var current_date, current_weatherIcon, curent_minTemp, current_maxTemp, current_weatherDesc, current_cloudiness, current_windSpeed;
	var i = 1;
	for (var prop in obj.list) {
         //console.log("Key:" + prop);
		 //console.log("Value:" + JSON.stringify(obj.list[prop]));
		//console.log(moment(obj.list[prop].dt_txt).format("DD-MM-YYYY"));
        if(current_date == null){
			current_date = moment(obj.list[prop].dt_txt).format("DD-MM-YYYY");
			current_weatherIcon = obj.list[prop].weather[0].icon;
			current_weatherDesc = obj.list[prop].weather[0].description;
			curent_minTemp = obj.list[prop].main.temp_min;
			current_maxTemp = obj.list[prop].main.temp_max;
			current_cloudiness = obj.list[prop].clouds.all;
			current_windSpeed = obj.list[prop].wind.speed;
		}else if(current_date == moment(obj.list[prop].dt_txt).format("DD-MM-YYYY")){
			if(current_maxTemp < obj.list[prop].main.temp_max){
				current_maxTemp = obj.list[prop].main.temp_max;
			} if(curent_minTemp > obj.list[prop].main.temp_min){
				curent_minTemp = obj.list[prop].main.temp_min;
			} if(current_cloudiness < obj.list[prop].clouds.all){
				current_cloudiness = obj.list[prop].clouds.all;
			} if(current_windSpeed < obj.list[prop].wind.speed){
				current_windSpeed = obj.list[prop].wind.speed;
			}
			current_date = moment(obj.list[prop].dt_txt).format("DD-MM-YYYY");
			current_weatherIcon = obj.list[prop].weather[0].icon;
			current_weatherDesc = obj.list[prop].weather[0].description;
			if(prop==(obj.cnt-1)){
			// console.log(i);
			//Generate 5th day weather
			document.getElementById(i).innerHTML = "<img src='" + IMG_URL
			+ current_weatherIcon + ".png'> <br>Date :"+current_date + "<br>Min Temp:"
			+ curent_minTemp + " C<br>" + "Max Temp:"
			+ current_maxTemp + " C<br>" + "Weather :"
			+ current_weatherDesc + "<br>" + "Cloudiness:"
			+ current_cloudiness + " %<br>" + "Wind:" + current_windSpeed
			+ " mps <br>";
			}
			
        }else if(current_date < moment(obj.list[prop].dt_txt).format("DD-MM-YYYY")){
			//Generate first 4 days weather
			//var todayId = "'day"+i+"div'";
			document.getElementById(i).innerHTML = "<img src='" + IMG_URL
			+ current_weatherIcon + ".png'> <br>Date :"+current_date + "<br>Min Temp:"
			+ curent_minTemp + " C<br>" + "Max Temp:"
			+ current_maxTemp + " C<br>" + "Weather :"
			+ current_weatherDesc + "<br>" + "Cloudiness:"
			+ current_cloudiness + " %<br>" + "Wind:" + current_windSpeed
			+ " mps <br>";
			
			current_date = moment(obj.list[prop].dt_txt).format("DD-MM-YYYY");
			current_weatherIcon = obj.list[prop].weather[0].icon;
			current_weatherDesc = obj.list[prop].weather[0].description;
			curent_minTemp = obj.list[prop].main.temp_min;
			current_maxTemp = obj.list[prop].main.temp_max;
			current_cloudiness = obj.list[prop].clouds.all;
			current_windSpeed = obj.list[prop].wind.speed;
			i = i + 1; // Increment for next day
		}
       
    }

} 



