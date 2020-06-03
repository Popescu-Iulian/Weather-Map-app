const LOCATION = document.querySelector('#location');
const ICON = document.querySelector('#icon');
const DESCRIPTION = document.querySelector('#description');
const HUMIDITY = document.querySelector('#humidity');
const TEMP = document.querySelector('#temperature');
const WIND = document.querySelector('#wind');
const LOCATION_INPUT = document.querySelector('input');
const MAP_DIV = document.querySelector('#map');
const FORECAST_DIV = document.querySelector('#forecast');

class LocalStorage {
	constructor() {
		this.city;
	}

	getLocationData() {
		if (localStorage.getItem('city') === null) {
			this.city = 'Bucharest';
			// poate ii dai valoarea din geolocalizare
		} else {
			this.city = localStorage.getItem('city');
		}

		return this.city;
	}

	setLocationData(city) {
		localStorage.setItem('city', city);
	}
}

class GetWeatherData {
	constructor(city) {
		this.apiKey = '9a69dfc035a5bc26f2d310c17aecd706';
		this.city = city;
	}

	async getLocationWeather() {
		const WEATHER_RESPONSE = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`
		);

		const WEATHER_RESPONSE_DATA = await WEATHER_RESPONSE.json();

		const COORDS = {
			lat: WEATHER_RESPONSE_DATA.coord.lat,
			lng: WEATHER_RESPONSE_DATA.coord.lon
		};

		initMap(COORDS);

		return WEATHER_RESPONSE_DATA;
	}

	changeLocation(city) {
		this.city = city;
	}
}

class GetForecastData {
	constructor(city) {
		this.apiKey = '9a69dfc035a5bc26f2d310c17aecd706';
		this.city = city;
	}

	async getLocationForecast() {
		const FORECAST_RESPONSE = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.apiKey}&units=metric`
		);

		const FORECAST_RESPONSE_DATA = await FORECAST_RESPONSE.json();

		return FORECAST_RESPONSE_DATA;
	}

	changeLocation(city) {
		this.city = city;
	}
}

class DisplayWeatherData {
	constructor(location, details, icon, humidity, temperature, wind) {
		this.location = location;
		this.details = details;
		this.icon = icon;
		this.humidity = humidity;
		this.temperature = temperature;
		this.wind = wind;
	}

	displayWeather(weather) {
		this.location.textContent = weather.name;
		this.details.textContent = weather.weather[0].description;
		this.icon.setAttribute(
			'src',
			`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
		);
		this.humidity.textContent = `Humidity: ${weather.main.humidity}%`;
		this.temperature.textContent = `Temperature: ${weather.main.temp} °C`;
		this.wind.textContent = `Wind Speed: ${weather.wind.speed} m/s`;
	}
}

class DisplayForecastData {
	displayForecast(weather) {
		let forecast_infos = '';

		for (let i = 0; i < weather.list.length; i++) {
			forecast_infos += `
				<div id="flex-items">
					<p class="day">${weather.list[i].dt_txt.substring(0, 10)}</p>
					<img class="day-icon" src="http://openweathermap.org/img/wn/${
						weather.list[i].weather[0].icon
					}@2x.png" />
					<p class="day-hour">Hour: ${weather.list[i].dt_txt.substring(10, 16)}</p>
					<p class="day-temperature">Temperature: ${weather.list[i].main.temp}</p>
					<p class="day-description">Sumary: ${weather.list[i].weather[0].description}</p>
				</div>
		  `;
		}

		FORECAST_DIV.innerHTML = forecast_infos;
	}
}

const LOCAL_STORAGE = new LocalStorage();
const USER_LOCATION = LOCAL_STORAGE.getLocationData();
const LOCATION_WEATHER = new GetWeatherData(USER_LOCATION);
const DISPLAY_WEATHER = new DisplayWeatherData(
	LOCATION,
	DESCRIPTION,
	ICON,
	HUMIDITY,
	TEMP,
	WIND
);

let location_forecast = new GetForecastData(USER_LOCATION);
let display_forecast = new DisplayForecastData();

function changeUserLocation() {
	LOCATION_WEATHER.changeLocation(LOCATION_INPUT.value);

	LOCAL_STORAGE.setLocationData(LOCATION_INPUT.value);

	getWeather();
}

function showWeatherForecast() {
	location_forecast.changeLocation(LOCATION_INPUT.value);

	LOCAL_STORAGE.setLocationData(LOCATION_INPUT.value);

	changeUserLocation();

	getForecast();
}

function getWeather() {
	LOCATION_WEATHER.getLocationWeather()
		.then((results) => DISPLAY_WEATHER.displayWeather(results))
		.catch((err) => console.error(err));
}

function getForecast() {
	location_forecast
		.getLocationForecast()
		.then((results) => display_forecast.displayForecast(results))
		.catch((err) => console.error(err));
}

function initMap(coords) {
	const MAP_OPTIONS = {
		center: coords,
		zoom: 12
	};

	return new google.maps.Map(MAP_DIV, MAP_OPTIONS);
}

// https://api.openweathermap.org/data/2.5/forecast?q=iasi&appid=9a69dfc035a5bc26f2d310c17aecd706&units=metric
