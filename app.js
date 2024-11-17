// Add an event listener to the window that fires when the page is fully loaded
window.addEventListener('load', () => {
    // Add a click event listener to the button with id "btn"
    document.querySelector("button#btn").addEventListener("click", (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Get the trimmed value from the search input field with id "searchField"
        const searchField = document.getElementById('searchField').value.trim(); 
        // Get the element with id "results" to display the fetched data or error messages
        const results = document.getElementById('results'); 

        // Base URL for the PHP script handling the search functionality
        let url = 'superheroes.php';
        // Append the search query parameter to the URL if the search field is not empty
        if (searchField !== "") {
            url += `?query=${encodeURIComponent(searchField)}`;
        }

        // Make a fetch request to the constructed URL
        fetch(url)
            .then(response => {
                // Check if the response status is OK (200-299), otherwise throw an error
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Return the response text for further processing
                return response.text();
            })
            .then(data => {
                // Display the fetched data inside the "results" element
                results.innerHTML = data; 
            })
            .catch(error => {
                // Log any errors to the console and display an error message in the "results" element
                console.error('Error:', error);
                results.innerHTML = "<span>Error fetching data. Please try again.</span>";
            });
    });
});
