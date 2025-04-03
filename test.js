document.addEventListener("DOMContentLoaded", function () {
    let downloadButtons = document.querySelectorAll(".download-btn");

    downloadButtons.forEach(button => {
        button.addEventListener("click", function () {
            let fileUrl = this.getAttribute("data-file");

            if (fileUrl) {
                let link = document.createElement("a");
                link.href = fileUrl;
                link.download = fileUrl.split('/').pop();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert("File not found!");
            }
        });
    });
});

// Search Notes
function searchNotes() {
    let input = document.getElementById("searchBox").value.trim().toLowerCase();
    let notes = document.querySelectorAll(".note-card");
    let noResultsMessage = document.getElementById("noResults");
    
    let found = false;

    notes.forEach(note => {
        let title = note.dataset.title ? note.dataset.title.toLowerCase() : "";
        if (title.includes(input)) {
            note.style.display = "block"; 
            found = true;
        } else {
            note.style.display = "none";
        }
    });

    noResultsMessage.style.display = found ? "none" : "block";
}

// Language Translation
function translateNotes() {
    let language = document.getElementById("language").value;
    let downloadButtons = document.querySelectorAll(".download-btn");

    downloadButtons.forEach(button => {
        button.innerText = `Download (${language})`;
    });
}


//upload page 
document.addEventListener("DOMContentLoaded", function () {
    let uploadButton = document.getElementById("uploadButton");

    uploadButton.addEventListener("click", function () {
      
        window.location.href = "upload/upload.html"; 
    });
});



//summerizatoin

// Define API endpoint and token
const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"; 
const API_TOKEN = "";

// Function to call Hugging Face API for summarization
async function summarizeText() {
    let inputText = document.getElementById("textInput").value.trim(); // Get user input

    if (!inputText) {
        alert("Please enter some text to summarize.");
        return;
    }

    try {
        // Prepare request headers and body
        const headers = {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        };

        const body = {
            inputs: inputText
        };

        // Make the API request
        const response = await fetch(API_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const result = await response.json();

        // Check if the response contains a summary
        if (result && result[0] && result[0].summary_text) {
            document.getElementById('summaryOutput').innerText = result[0].summary_text;
        } else {
            document.getElementById('summaryOutput').innerText = "Error: Unable to generate summary.";
        }

    } catch (error) {
        console.error('Error summarizing text:', error);
        document.getElementById('summaryOutput').innerText = "Error: Unable to generate summary.";
    }
}

// Add event listener to the button
document.getElementById("summarizeButton").addEventListener("click", summarizeText);
