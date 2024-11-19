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


function createDestinationElement(destination) {
    // Create the container div for the destination
    const destinationDiv = document.createElement('div');
    destinationDiv.classList.add('destination'); // Add a class for styling

    // Create the image element
    const image = document.createElement('img');
    image.src = destination.imageUrl;
    image.alt = destination.name; // Alt text for the image
    image.title = destination.name; // Title text for the image
    image.style.width = '100%'; // Optional: set a default width

    // Create the title element
    const title = document.createElement('h2');
    title.textContent = destination.name;

    // Create the description element
    const description = document.createElement('p');
    description.textContent = destination.description;

    // Append the created elements to the destination container
    destinationDiv.appendChild(image);
    destinationDiv.appendChild(title);
    destinationDiv.appendChild(description);

    // Append the destination container to the DOM
    const container = document.getElementById('ResultContent');
    container.appendChild(destinationDiv);
}

function clearContent(){
    document.getElementById("ResultContent").innerHTML = "";
}

function keywordSearch(form){
    const search = String(form.getElementsByTagName('input')[0].value);
    if(!search || search === '') return;
    
    const validKey = Object.keys(reccomendations).find( x=>  x.includes(search.toLowerCase()))
    if(validKey){
        clearContent();
        console.log(reccomendations[validKey])
        
        const resultContent = document.getElementById("ResultContent")
        reccomendations[validKey].forEach(destination=>{
            createDestinationElement(destination)
            

        })
        return reccomendations[validKey]
    }
    else{
        return []
    }
}

