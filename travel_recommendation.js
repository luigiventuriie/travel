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

function fetchReccomendations(form){
    const search = form.getElementsByTagName('input')[0].value;

    fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(json => {
        const validKey = Object.keys(json).find( x=>  x.includes(search))
        if(validKey){
            return json[validKey]
        }
        else{
            return []
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


loadContent("home.html")

