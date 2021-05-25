const returnedDataDiv = document.querySelector('#returnedDataDiv')
const fiveDayForecastDiv = document.querySelector('#fiveDayForecast')
// const searchedCity = document.querySelector('#searchedCity')
const searchForm = document.querySelector('#searchCityForm');
const apiKey = '3664890572785f16ad10031c24428df2'


function handleFormSubmit (event) {
    event.preventDefault();
    const searchedCityVal = document.querySelector('#city').value;
    if (!searchedCityVal) {
        console.error('please input city')
        return;
    }
    console.log(searchedCityVal)

currentWeather(searchedCityVal);

};

function currentWeather (searchedCityVal) {


    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchedCityVal + '&appid=' + apiKey + '&units=imperial'

    fetch(apiUrl)
    .then(function (response){
        if (!response.ok) {
            throw response.json();
          }
    
          return response.json();
        
    })
    .then(function (returnedData){
        console.log(returnedData)
        createForecast(returnedData.coord.lat, returnedData.coord.lon)
    })



}

function forecastedFiveDay (e) {
    e.preventDefault();


}

function createForecast (lat, lon) {

    const apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial'

    fetch(apiUrl)
    .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
    .then(function(oneCallData){
        console.log(oneCallData)
        //for loop for creating cards 
        //i less than 5 

        let returnedDataCard = document.createElement('div');
        returnedDataCard.classList.add('card', 'bg-dark', 'text-white', 'mb-3', 'p-3');
    
        let titleEl = document.createElement('div');
        titleEl.classList.add('card-header', 'bg-dark', 'text-white');
        titleEl.textContent = 'Current Forecast for ' + document.querySelector('#city').value;
        returnedDataCard.append(titleEl)

        let weatherEl = document.createElement('p');
        weatherEl.innerText = 'General Weather Conditions: ' + oneCallData.current.weather[0].description
        
        let tempEl = document.createElement('p');
        tempEl.innerText = 'Avg Temp: ' + oneCallData.current.temp;
    
        let feelsLikeEl = document.createElement('p');
        feelsLikeEl.innerText = 'Feels Like:' + ' ' + oneCallData.current.feels_like;
    
        let humidityEl = document.createElement('p');
        humidityEl.innerText = 'Humidity:' + ' ' + oneCallData.current.humidity;

        let windSpeedEl = document.createElement('p');
        windSpeedEl.innerText = 'Wind Speed: ' + oneCallData.current.wind_speed

        let uvIndexEl = document.createElement('p');
        uvIndexEl.innerText = 'UV Index: ' + oneCallData.current.uvi

        let resultBody = document.createElement('div');
        resultBody.classList.add('card-body');
    
        resultBody.append(weatherEl, tempEl, feelsLikeEl, humidityEl, windSpeedEl, uvIndexEl);
    
        returnedDataCard.append(resultBody);
    
    
        returnedDataDiv.append(returnedDataCard)


        for (let index = 0; index < 5; index++) {
            
            let returnedDataCard = document.createElement('div');
            returnedDataCard.classList.add('card', 'bg-dark', 'text-white', 'mb-3', 'p-3');

            let weatherEl = document.createElement('p');
            weatherEl.innerText = 'General Weather Conditions: ' + oneCallData.daily[index].weather[0].description;    
    
            let highTempEl = document.createElement('p');
            highTempEl.innerText = 'High of: ' + oneCallData.daily[index].temp.max;
    
            let lowTempEl = document.createElement('p');
            lowTempEl.innerText = 'Low of: ' + oneCallData.daily[index].temp.min;
            
            let feelsLikeEl = document.createElement('p');
            feelsLikeEl.innerText = 'Feels Like:' + ' ' + oneCallData.daily[index].feels_like.day;
        
            let humidityEl = document.createElement('p');
            humidityEl.innerText = 'Humidity:' + ' ' + oneCallData.daily[index].humidity;

            let windSpeedEl = document.createElement('p');
            windSpeedEl.innerText = 'Wind Speed: ' + oneCallData.daily[index].wind_speed

            let uvIndexEl = document.createElement('p');
            uvIndexEl.innerText = 'UV Index: ' + oneCallData.daily[index].uvi
    
            let resultBody = document.createElement('div');
            resultBody.classList.add('card-body');
        
            resultBody.append(weatherEl, highTempEl, lowTempEl, feelsLikeEl, humidityEl, windSpeedEl, uvIndexEl);
        
            returnedDataCard.append(resultBody);
        
        
            fiveDayForecastDiv.append(returnedDataCard)
        
    
        }
    })
}

searchForm.addEventListener('submit', handleFormSubmit);


