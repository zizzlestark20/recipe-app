const container = document.querySelector('.container');
const searchResultDiv = document.querySelector('.search-result');
const searchForm = document.querySelector('form');
let searchQuery = '';

const APP_ID ='bb800a8e';
const APP_KEY = '96b6e781224ed1635ff192f88464de93';


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
})

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=24`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results){
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
                <img src="${result.recipe.image}" alt="food">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
                </div>
                <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                <p class="item-data">Health Info: ${result.recipe.healthLabels}</p>
            </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}