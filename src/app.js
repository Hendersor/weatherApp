const inputCity = document.getElementById('inputCity');
const searchIcon = document.getElementById('searchIcon');
const crossIcon = document.getElementById('crossIcon');
const iconWeather = document.getElementById('iconWeather');
const temperature = document.getElementById('temperature');
const clime = document.getElementById('clime');
const termic = document.getElementById('termic');
const ubication = document.getElementById('location');
const date = document.getElementById('date');
const iconImage = document.getElementById('iconImage');
const dayText = document.getElementById('day');

let cityName;

crossIcon.addEventListener('click', cleanInput);
function cleanInput(){
     inputCity.value = '';
     getCityInput();
}

inputCity.addEventListener('input', getCityInput);
function getCityInput(){
     cityName = inputCity.value;
     crossIcon.classList.replace('hidden', 'visible');
     if(cityName == ''){
          crossIcon.classList.replace('visible', 'hidden');
     }
}

inputCity.addEventListener('keyup', citySearch);
function citySearch(e){
     if(e.keyCode == 13 && cityName != ''){
          getWeather();
     }
}


async function getWeather(){
     const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=86e024a5e8c23b961035736b9f56fd33`);
     const data = await response.json();     

     const cityLat = data[0].lat;
     const cityLon = data[0].lon;
     const weatherFetch = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=metric&exclude={part}&appid=86e024a5e8c23b961035736b9f56fd33`);
     const weatherData = await weatherFetch.json();
     console.log(weatherData);

     const iconCode = weatherData.current.weather[0].icon;
     iconImage.src = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;

     const dataTemperature = weatherData.current.temp.toFixed(0);
     temperature.innerText = `${dataTemperature}°C`;

     const mainWeather = weatherData.current.weather[0].main;
     clime.innerText = mainWeather;

     const feelsLike = weatherData.current.feels_like.toFixed(0);
     termic.innerText = `Feels like ${feelsLike}°C`;

     const locationName = data[0].name;
     ubication.innerText = locationName;
     getDate();

     const time = new Date();
     const day = time.getDay();
     const todayIs = daysArray[day];
     dayText.innerText = todayIs;
     
     const dayClasses = document.querySelectorAll('.daysWeatherContainer .day .week');
     console.log(dayClasses);
     
     for(let i=0; i < 5; i++){
          dayClasses[i].innerText = daysArray[i];
     }

     const tagSelector = document.getElementsByClassName('.tagTemperature')

     // const daily = weatherData.daily;
     // daily.forEach( e =>{
     //      tagSelector.innerText = e.temp.day;
     //      console.log(tagSelector);
     //      console.log(e.temp.day);
     // });




}


const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
'August', 'September', 'October', 'November', 'December'];

const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getDate = () => {
     const time = new Date();
     const day = time.getDate();
     const year = time.getFullYear();
     const month = monthArray[time.getMonth()];


     const finalDate = `${month}/${day}/${year}`;
     date.innerText = finalDate;
}

