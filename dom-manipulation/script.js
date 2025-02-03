// Array of quote objects
let quotes = [];

// Load existing quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `${randomQuote.text} (${randomQuote.category})`;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;
  if (newQuoteText !== "" && newQuoteCategory !== "") {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes();
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteElement = document.createElement("p");
    newQuoteElement.textContent = `${newQuoteText} (${newQuoteCategory})`;
    quoteDisplay.appendChild(newQuoteElement);
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }
}

// Function to export quotes to JSON file
function exportToJsonFile() {
  const jsonQuotes = JSON.stringify(quotes);
  const blob = new Blob([jsonQuotes], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Load existing quotes from local storage
loadQuotes();

// Event listener for the "Show New Quote" button
document.getElementById("showNewQuote").addEventListener("click", function(){
  displayRandomQuote();
});

// Event listener for the "Add Quote" button
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Event listener for the "Export to JSON" button
document.getElementById("exportToJsonBtn").addEventListener("click", exportToJsonFile);

// Event listener for the "Import from JSON" file input
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Initial call to display a random quote
displayRandomQuote();

// Update the quote display every 10 seconds
setInterval(displayRandomQuote, 10000);

