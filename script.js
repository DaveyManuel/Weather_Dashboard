// const searchedCity = document.querySelector('#searchedCity')
const searchForm = document.querySelector('#searchCityForm');

function handleFormSubmit (event) {
    event.preventDefault();

    const searchedCityVal = document.querySelector('#city').value;
    // const button = document.querySelector('#button');

    if (!searchedCityVal) {
        console.error('please input city')
        return;
    }
console.log(searchedCityVal)
};

searchForm.addEventListener('submit', handleFormSubmit);


