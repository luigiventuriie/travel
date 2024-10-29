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

loadContent("home.html")