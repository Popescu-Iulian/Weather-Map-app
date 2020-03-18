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
      // poate ii dai valoarea din geolocalizare (nested if)
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
    const WEATHER_RESPONSE = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`);

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
    const FORECAST_RESPONSE = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.apiKey}&units=metric`);

    const FORECAST_RESPONSE_DATA = await FORECAST_RESPONSE.json();

    return FORECAST_RESPONSE_DATA;
  }
}

class DisplayWeatherData {
  constructor() {
    this.location = LOCATION;
    this.details = DESCRIPTION;
    this.icon = ICON;
    this.humidity = HUMIDITY;
    this.temperature = TEMP;
    this.wind = WIND;
  }

  displayWeather(weather) {
    this.location.textContent = weather.name;
    this.details.textContent = weather.weather[0].description;
    this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    this.humidity.textContent = `Humidity: ${weather.main.humidity}%`;
    this.temperature.textContent = `Temperature: ${weather.main.temp} °C`;
    this.wind.textContent = `Wind Speed: ${weather.wind.speed} m/s`;
  }
}

const LOCAL_STORAGE = new LocalStorage();
const USER_LOCATION = LOCAL_STORAGE.getLocationData();
const LOCATION_WEATHER = new GetWeatherData(USER_LOCATION);
const DISPLAY_WEATHER = new DisplayWeatherData();

function changeUserLocation() {
  LOCATION_WEATHER.changeLocation(LOCATION_INPUT.value);

  LOCAL_STORAGE.setLocationData(LOCATION_INPUT.value);

  getWeather();
}

function getWeather() {
  LOCATION_WEATHER.getLocationWeather()
    .then(results => DISPLAY_WEATHER.displayWeather(results))
    .catch(err => console.error(err))
}

function initMap(coords) {
  const MAP_OPTIONS = {
    center: coords,
    zoom: 12
  };

  return new google.maps.Map(MAP_DIV, MAP_OPTIONS);
}

function showWeatherForecast() { }