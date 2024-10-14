async function fetchGameResults() {
    try {
        // Fetch the content of the target page
        const response = await fetch('https://resultados.fpf.pt/Competition/Details?competitionId=19053&seasonId=99');
        
        // Ensure the response is OK
        if (!response.ok) throw new Error('Failed to fetch data');
        
        // Get the HTML content of the page
        const htmlText = await response.text();
        
        // Log the HTML for debugging purposes (optional)
        console.log(htmlText);
        
        // Create a temporary DOM parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        
        // Find the div with the ID htmlSerieId_77442
        const gameResultDiv = doc.querySelector('#htmlSerieId_77442');
        
        // Check if the div is found, and insert its content into the page
        if (gameResultDiv) {
            document.getElementById('result').innerHTML = gameResultDiv.innerHTML;
        } else {
            document.getElementById('result').innerText = 'Game result not found.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error fetching game result.';
    }
}

// Run the function when the page loads
window.onload = fetchGameResults;
