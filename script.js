class Weather {
  constructor(city) {
    this.apiKey = '9a69dfc035a5bc26f2d310c17aecd706'
    this.city = city
  }

  async getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`);

    const responseData = await response.json();

    return responseData;
  }

  async changeLocation(city) {
    this.city = city;
  }
}

const weather = new Weather('Paris');

weather.getWeather()
  .then(results => {
    console.log(results);
  })
  .catch(err => console.error(err));







// function initMap() {
//   let mapId = document.getElementById('map');
//   // The location of Uluru
//   var location = { lat: 48.856613, lng: 2.352222 };
//   // The map, centered at Uluru
//   var map = new google.maps.Map(
//     mapId, { zoom: 12, center: location });
// }