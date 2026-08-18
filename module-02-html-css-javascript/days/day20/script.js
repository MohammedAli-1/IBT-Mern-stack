'use strict';
// let x;
// function add(callback) {
//     setTimeout(() => { 
//         x = 10;
//         callback();
//     }, 2000);
// }

// function printX() {
//     console.log(x);
// }
// console.log('This message is logged immediately');
// add(printX);
// fetch("https://api.open-meteo.com/v1/forecast?latitude=9.03&longitude=38.74&current=temperature_2m,relative_humidity_2m,wind_speed_10m")
//     .then(response => response.json())
//     .then(data =>{
//       console.log(data.latitude, data.longitude);
//     })
      
//     .catch(error => console.error('Error fetching weather data:'));
// console.log("promise resolved");
async function fetchWeatherData() {
  try {
    const res=await fetch("https://api.open-meteo.com/v1/forecast?latitude=9.03&longitude=38.74&current=temperature_2m,relative_humidity_2m,wind_speed_10m");
    const data=await res.json();
    const { latitude, longitude } = data;
    console.log(latitude.toFixed(2), longitude.toFixed(2));
  }
  catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
fetchWeatherData();
