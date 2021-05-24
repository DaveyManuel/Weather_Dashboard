const returnedDataDiv = document.querySelector('#returnedDataDiv')
const searchedCity = document.querySelector('#searchedCity')
const searchForm = document.querySelector('#searchCityForm');

function handleFormSubmit (event) {
    event.preventDefault();



currentWeather(event);

};

function currentWeather (e) {
    e.preventDefault();

    const searchedCityVal = document.querySelector('#city').value;
    // const button = document.querySelector('#button');

    if (!searchedCityVal) {
        console.error('please input city')
        return;
    }
    console.log(searchedCityVal)

    let resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-dark', 'text-white', 'mb-3', 'p-3');

    let titleEl = document.createElement('div');
    titleEl.classList.add('card-header', 'bg-dark', 'text-white');
    titleEl.textContent = searchedCityVal + '    ' + 'date';
    resultCard.append(titleEl)

    let resultBody = document.createElement('div');
    resultBody.classList.add('card-body');

    let tempEl = document.createElement('p');
    tempEl.innerText = 'Temp:';

    let windEl = document.createElement('p');
    windEl.innerText = 'Wind:';

    let humidityEl = document.createElement('p');
    humidityEl.innerText = 'Humidity:';

    resultBody.append(tempEl, windEl, humidityEl);
    
    resultCard.append(resultBody);


    searchedCity.append(resultCard)


}

function searchWeatherData (e) {
    // const lat = 
    // const lon = 
    const apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=Trilogy'
}

searchForm.addEventListener('submit', handleFormSubmit);


