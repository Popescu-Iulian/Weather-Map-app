///////////////////////////////////////////////////////////////
///////////////////////STORAGE/////////////////////////////////
class Storage {
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

///////////////////////////////////////////////////////////////
///////////////////////WEATHER/////////////////////////////////
class Weather {
  constructor(city) {
    this.apiKey = '9a69dfc035a5bc26f2d310c17aecd706';
    this.city = city;
  }

  async getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`);

    const responseData = await response.json();

    return responseData;
  }

  changeLocation(city) {
    this.city = city;
  }
}

///////////////////////////////////////////////////////////////
///////////////////////UI//////////////////////////////////////
class UI {
  constructor() {
    this.location = document.querySelector('#location');
    this.details = document.querySelector('#details');
    this.icon = document.querySelector('#icon');
    this.humidity = document.querySelector('#humidity');
    this.temperature = document.querySelector('#temperature');
    this.wind = document.querySelector('#wind');
  }

  paint(weather) {
    this.location.textContent = weather.name;
    this.details.textContent = weather.weather[0].description;
    this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    this.humidity.textContent = `Humidity: ${weather.main.humidity}%`;
    this.temperature.textContent = `Temperature: ${weather.main.temp} °C`;
    this.wind.textContent = `Wind Speed: ${weather.wind.speed} m/s`;
  }
}

///////////////////////////////////////////////////////////////
///////////////////////APP/////////////////////////////////////
const storage = new Storage();
const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation);
const ui = new UI();

function changeWeather() {
  const input = document.querySelector('input').value;

  weather.changeLocation(input);

  storage.setLocationData(input);

  getWeather();
}

function getWeather() {
  weather.getWeather()
    .then(results => ui.paint(results))
    .catch(err => console.error(err))
}