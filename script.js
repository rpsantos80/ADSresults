async function fetchGameResults() {
    try {
        // Fetch the content of the target page
        const response = await fetch('https://resultados.fpf.pt/Competition/Details?competitionId=19053&seasonId=99');
        
        // Make sure we got a valid response
        if (!response.ok) throw new Error('Failed to fetch data');
        
        // Parse the text content of the page
        const htmlText = await response.text();
        
        // Create a temporary DOM parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        
        // Extract the part with the specific ID 
        const gameResult = doc.querySelector('#77444'); // Adjust the selector as needed
        
        if (gameResult) {
            // Display the result in our own page
            document.getElementById('result').innerHTML = gameResult.innerHTML;
        } else {
            document.getElementById('result').innerText = 'Game result not found.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error fetching game result.';
    }
}

// Call the function on page load
window.onload = fetchGameResults;