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

searchIcon.addEventListener('click', search);
function search(){
     getWeather();
}

inputCity.addEventListener('keyup', citySearch);
function citySearch(e){
     if(e.keyCode == 13 && cityName != ''){
          getWeather();
     }
}


const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
'August', 'September', 'October', 'November', 'December'];

const daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const time = new Date();
const day = time.getDate();
const year = time.getFullYear();

const getDate = () => {
     const month = monthArray[time.getMonth()];
     const finalDate = `${month}/${day}/${year}`;
     date.innerText = finalDate;
}

const todayIs = daysArray[day];
let todayIsIndex = daysArray.indexOf(todayIs);
let count = todayIsIndex + 2;
let newWeek = [];
const getTheNewWeek = () =>{
     let index = count % daysArray.length;
     newWeek.push(daysArray[index])
     count++;
     
     if (count === daysArray.length) {
       count = 0;
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

     const mainWeather = weatherData.current.weather[0].description;
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
     const iconWeekClasses = document.querySelectorAll('.daysWeatherContainer .day .weekIconContainer');
     

     for(let i=0; i < 5; i++){
          getTheNewWeek(i)
          dayClasses[i].innerText = newWeek[i];
     }
     

     const lowTemperatures = document.querySelectorAll('.lowTemperature');
     const highTemperatures = document.querySelectorAll('.highTemperature');
     const newWeekArray = weatherData.daily.slice(1);
     console.log(newWeekArray);
     for(let i = 0; i < iconWeekClasses.length; i++){
          let weatherIconWeek = newWeekArray[i].weather[0].icon;
          iconWeekClasses[i].src = `http://openweathermap.org/img/wn/${weatherIconWeek}@4x.png`;
          lowTemperatures[i].innerText = `${newWeekArray[i].temp.min.toFixed(0)}°C`;
          highTemperatures[i].innerText = `${newWeekArray[i].temp.max.toFixed(0)}°C`;
     }

     console.log(newWeek)
     displayAppAnimation();
}


function displayAppAnimation(){
     const mainApp = document.getElementById('mainApp');
     mainApp.classList.replace('displayOff', 'displayOn');
}
