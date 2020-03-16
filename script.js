
/////////////////// storage ///////////////////
class Storage {
  constructor() {
    this.city
    this.country
    this.defaultCity = 'Paris'
  }

  getLocationData() {
    localStorage.getItem('city') === null
      ? (this.city = this.defaultCity)
      : (this.city = localStorage.getItem('city'))

    return {
      city: this.city,
    }
  }

  setLocationData(city) {
    localStorage.setItem('city', city)
  }
}

/////////////////// weather ///////////////////////
class Weather {
  constructor(city) {
    this.apiKey = '9a69dfc035a5bc26f2d310c17aecd706'
    this.city = city
  }

  //fetch weather from api
  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.apiKey}&units=metric`
    )

    const responseData = await response.json()
    console.log(responseData)

    return responseData
  }

  //change location
  changeLocation(city) {
    this.city = city
  }
}

/////////////////// ui ///////////////////

const userlocation = document.querySelector('.location');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

class UI {
  constructor() {
    this.location = userlocation
    this.humidity = humidity
    this.wind = wind
  }

  paint(weather) {
    this.location.textContent = weather.name
    this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}`
    this.wind.textContent = `Wind Speed: ${weather.wind.speed}meters/sec`
  }
}

/////////////////// app ///////////////////
// initialise the Storage object
const storage = new Storage()

//get stored location data
const weatherLocation = storage.getLocationData()

//init weather object
const weather = new Weather(weatherLocation.city)

//init ui
const ui = new UI()

//get weather on dom load
// document.addEventListener('DOMContentLoaded', getWeather)

// //change location event
// document.getElementById('w-change-btn').addEventListener('click', e => {
//   const city = document.getElementById('city').value
//   const country = document.getElementById('country').value

//   //change location
//   weather.changeLocation(city, country)

//   //set location in local storage
//   storage.setLocationData(city, country)

//   //get and display weather
//   getWeather()

//   //close modal
//   $('#locModal').modal('hide')
// })

function getWeather() {
  weather
    .getWeather()
    .then(results => {
      ui.paint(results)
    })
    .catch(err => console.log(err))
}








// this.apiKey = '9a69dfc035a5bc26f2d310c17aecd706';



// function initMap() {
//   let mapId = document.getElementById('map');
//   // The location of Uluru
//   var location = { lat: 48.856613, lng: 2.352222 };
//   // The map, centered at Uluru
//   var map = new google.maps.Map(
//     mapId, { zoom: 12, center: location });
// }