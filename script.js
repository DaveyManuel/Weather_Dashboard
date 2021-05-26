const returnedDataDiv = document.querySelector('#returnedDataDiv')
const fiveDayForecastDiv = document.querySelector('#fiveDayForecast')
const searchForm = document.querySelector('#searchCityForm');
const apiKey = '3664890572785f16ad10031c24428df2'


function handleFormSubmit (event) {
    event.preventDefault();
    const searchedCityVal = document.querySelector('#city').value;
    localStorage.setItem('searchedCity', searchedCityVal);


    if (!searchedCityVal) {
        console.error('please input city')
        return;
    }

    if(returnedDataDiv && fiveDayForecastDiv){
        returnedDataDiv.innerHTML = '';
        fiveDayForecastDiv.innerHTML = '';
        
        searchWeather(searchedCityVal);

    }

    console.log(searchedCityVal)

};

function searchWeather (searchedCityVal) {


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

        let returnedDataCard = document.createElement('div');
        returnedDataCard.classList.add('card', 'bg-dark','fw-bolder', 'fs-1');

        let date = new Date(oneCallData.current.dt * 1000);
    
        let titleEl = document.createElement('div');
        titleEl.classList.add('card-header', 'bg-transparent',);
        titleEl.innerHTML = 'Current Forecast for ' + document.querySelector('#city').value + '<br/>' + date.toLocaleDateString('en-US');
        returnedDataCard.append(titleEl)

        let weatherEl = document.createElement('p');
        weatherEl.innerHTML = 'General Weather Conditions: ' + oneCallData.current.weather[0].description

        switch (oneCallData.current.weather[0].main) {
            case 'Clear':
                weatherEl.innerHTML += ' <i class="fas fa-sun"></i>'
                returnedDataCard.classList.add('sunny', 'text-white')
                break;
            case 'Clouds':
                weatherEl.innerHTML += ' <i class="fas fa-cloud-sun"></i>'
                returnedDataCard.classList.add('cloudy', 'text-dark')
                titleEl.classList.add('text-dark');
                break;
            case 'Thunderstorm':
                weatherEl.innerHTML += ' <i class="fas fa-bolt"></i>'
                returnedDataCard.classList.add('thunder', 'text-white')
                break;
            case 'Snow':
                weatherEl.innerHTML += ' <i class="fas fa-snowman"></i>'
                returnedDataCard.classList.add('snowy', 'text-white')
                break;
            case 'Rain':
                weatherEl.innerHTML += ' <i class="fas fa-cloud-showers-heavy"></i>'
                returnedDataCard.classList.add('rainy', 'text-white')
                break;
            case 'Drizzle':
                weatherEl.innerHTML += ' <i class="fas fa-cloud-rain"></i>'
                returnedDataCard.classList.add('drizzle', 'text-white')
                break;
        
            default:
                weatherEl.innerHTML = 'General Weather Conditions: ' + oneCallData.current.weather[0].description
                break;
        }
        
        let tempEl = document.createElement('p');
        tempEl.innerText = 'Current Temp: ' + oneCallData.current.temp;

        let highTempEl = document.createElement('p');
        highTempEl.innerText = 'High of: ' + oneCallData.daily[0].temp.max

        let lowTempEl = document.createElement('p');
        lowTempEl.innerText = 'Low of: ' + oneCallData.daily[0].temp.min
    
        let feelsLikeEl = document.createElement('p');
        feelsLikeEl.innerText = 'Feels Like:' + ' ' + oneCallData.current.feels_like;
    
        let humidityEl = document.createElement('p');
        humidityEl.innerText = 'Humidity:' + ' ' + oneCallData.current.humidity;

        let windSpeedEl = document.createElement('p');
        windSpeedEl.innerText = 'Wind Speed: ' + oneCallData.current.wind_speed

        let uvIndexEl = document.createElement('p');
        uvIndexEl.innerText = 'UV Index: ' + oneCallData.current.uvi

        if (oneCallData.current.uvi <= 2) {
            uvIndexEl.classList.add('text-success');
        } else if (oneCallData.current.uvi <= 6 && oneCallData.current.uvi > 2) { 
            uvIndexEl.classList.add('text-warning');
        } else if (oneCallData.current.uvi >= 7 ) {
            uvIndexEl.classList.add('text-danger');
        }

        let resultBody = document.createElement('div');
        resultBody.classList.add('card-body', 'row');

        let leftColBody = document.createElement('div');
        leftColBody.classList.add('col');

        let rightColBody = document.createElement('div');
        rightColBody.classList.add('col');

        leftColBody.append(weatherEl, tempEl, highTempEl, lowTempEl);
        rightColBody.append(feelsLikeEl, humidityEl, windSpeedEl, uvIndexEl);
    
        resultBody.append(leftColBody,rightColBody);
    
        returnedDataCard.append(resultBody);
    
    
        returnedDataDiv.append(returnedDataCard)


        for (let index = 1; index < 6; index++) {
            
            let returnedDataCard = document.createElement('div');
            returnedDataCard.classList.add('card', 'bg-dark', 'fw-bolder', 'm-3', 'p-3', 'col-2','fs-6');

            let date = new Date(oneCallData.daily[index].dt * 1000);
            let dateEl = document.createElement('h3');
            dateEl.innerText = date.toLocaleDateString('en-US')

            let weatherEl = document.createElement('p');
            weatherEl.innerText = 'General Weather Conditions: ' + oneCallData.daily[index].weather[0].description;  
            
            switch (oneCallData.daily[index].weather[0].main) {
                case 'Clear':
                    weatherEl.innerHTML += ' <i class="fas fa-sun"></i>'
                    returnedDataCard.classList.add('sunny', 'text-white')
                    break;
                case 'Clouds':
                    weatherEl.innerHTML += ' <i class="fas fa-cloud-sun"></i>'
                    returnedDataCard.classList.add('cloudy', 'text-dark')
                    break;
                case 'Thunderstorm':
                    weatherEl.innerHTML += ' <i class="fas fa-bolt"></i>'
                    returnedDataCard.classList.add('thunder', 'text-white')
                    break;
                case 'Snow':
                    weatherEl.innerHTML += ' <i class="fas fa-snowman"></i>'
                    returnedDataCard.classList.add('snowy', 'text-white')
                    break;
                case 'Rain':
                    weatherEl.innerHTML += ' <i class="fas fa-cloud-showers-heavy"></i>'
                    returnedDataCard.classList.add('rainy', 'text-white')
                    break;
                case 'Drizzle':
                    weatherEl.innerHTML += ' <i class="fas fa-cloud-rain"></i>'
                    returnedDataCard.classList.add('drizzle', 'text-white')
                    break;
            
                default:
                    weatherEl.innerHTML = 'General Weather Conditions: ' + oneCallData.current.weather[0].description
                    break;
            }
    
    
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

            if (oneCallData.daily[index].uvi <= 2) {
                uvIndexEl.classList.add('text-success');
            } else if (oneCallData.daily[index].uvi <= 6 && oneCallData.daily[index].uvi > 2) { 
                uvIndexEl.classList.add('text-warning');
            } else if (oneCallData.daily[index].uvi >= 7 ) {
                uvIndexEl.classList.add('text-danger');
            }
    
    
            let resultBody = document.createElement('div');
            resultBody.classList.add('card-body');
        
            resultBody.append(dateEl, weatherEl, highTempEl, lowTempEl, feelsLikeEl, humidityEl, windSpeedEl, uvIndexEl);
        
            returnedDataCard.append(resultBody);
        
        
            fiveDayForecastDiv.append(returnedDataCard)
        
    
        }
    })
}

searchForm.addEventListener('submit', handleFormSubmit);


