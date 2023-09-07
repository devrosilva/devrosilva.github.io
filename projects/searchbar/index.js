const citiesEndPoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchBar = document.getElementById('search-bar');
const resultsContainer = document.getElementById('results-container');

const cities = [];
const getData = async () => {
    const res = await fetch(citiesEndPoint);
    if(res.ok){
        return res.json();
    }
    throw Error("Data not available");
}
getData().then(data => cities.push(...data));

const isValid = (item, input) => {
    const hasCity = item.city.toLowerCase().includes(input.toLowerCase());
    const hasState = item.state.toLowerCase().includes(input.toLowerCase());
    return hasCity || hasState;
}

const filterArray = (input, array) => {
    return array
        .filter(item => isValid(item, input))
        .sort((a, b) => a.city > b.city ? 1 : -1);
}

const clearResultList = (e, element) => {
    if(e.type === 'click' && e.target.tagName === 'MAIN') e.target.firstElementChild.value = '';
    else if(e.type === 'click' && e.target.tagName !== 'MAIN') return; 

    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

const createResultList = (input, citiesAndStates) => {
    for(city of citiesAndStates){
        const resultChild = document.createElement('div');
        resultChild.classList.add('result-item');

        const regex = new RegExp(input, 'gi');
        const leftText = document.createElement('span');
        leftText.classList.add('result-item-child');
        leftText.insertAdjacentHTML('afterbegin', `${city.city}, ${city.state}`.replace(regex, '<mark>$&</mark>'));

        const rightText = document.createElement('span');
        rightText.classList.add('result-item-child');
        rightText.textContent = Number(city.population).toLocaleString('en-US');

        resultChild.appendChild(leftText);
        resultChild.appendChild(rightText);

        resultsContainer.appendChild(resultChild);
    }
}

const handleInput = (e, citiesArray) => {
    const input = e.target.value;
    clearResultList(e, resultsContainer);

    if(input.length < 3) return;

    const citiesAndStates = filterArray(input, citiesArray);
    createResultList(input, citiesAndStates);
}

searchBar.addEventListener('input', e => handleInput(e, cities));
window.addEventListener('click', e => clearResultList(e, resultsContainer))