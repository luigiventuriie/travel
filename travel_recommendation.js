function loadContent(page) {
    const contentDiv = document.getElementById('Content');

    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            contentDiv.innerHTML = data;
        })
        .catch(error => {
            contentDiv.innerHTML = '<p>Error loading content.</p>';
            console.error('There was a problem with the fetch operation:', error);
        });
}

var reccomendations = [];

function fetchReccomendations(){

    fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(json => {
        reccomendations = json;
        console.log(json)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


loadContent("home.html")
fetchReccomendations();

function keywordSearch(form){
    const search = String(form.getElementsByTagName('input')[0].value);
    if(!search || search === '') return;

    const validKey = Object.keys(reccomendations).find( x=>  x.includes(search.toLowerCase()))
    if(validKey){
        console.log(reccomendations[validKey])
        return reccomendations[validKey]
    }
    else{
        return []
    }
}

function clear(form){
    form.getElementsByTagName('input')[0].value = '';
}