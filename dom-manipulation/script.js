// Array of quote objects
let quotes = [];
let selectedCategory = '';

// Function to display a random quote
function displayRandomQuote() {
if (quotes.length === 0) {
document.getElementById("quoteDisplay").innerHTML = "No quotes available.";
return;
}
const randomIndex = Math.floor(Math.random() * quotes.length);
const randomQuote = quotes[randomIndex];
const quoteDisplay = document.getElementById("quoteDisplay");
quoteDisplay.innerHTML = ${randomQuote.text} (${randomQuote.category});
}

// Function to add a new quote
function addQuote() {
const newQuoteText = document.getElementById("newQuoteText").value;
const newQuoteCategory = document.getElementById("newQuoteCategory").value;
if (newQuoteText !== "" && newQuoteCategory !== "") {
quotes.push({ text: newQuoteText, category: newQuoteCategory });
saveQuotesToLocalStorage();
displayRandomQuote();
document.getElementById("newQuoteText").value = "";
document.getElementById("newQuoteCategory").value = "";
}
}

// Function to save quotes to Local Storage
function saveQuotesToLocalStorage() {
localStorage.setItem('quotes', JSON.stringify(quotes));
localStorage.setItem('selectedCategory', selectedCategory);
}

// Function to load quotes from Local Storage
function loadQuotesFromLocalStorage() {
const storedQuotes = localStorage.getItem('quotes');
const storedSelectedCategory = localStorage.getItem('selectedCategory');
if (storedQuotes) {
quotes = JSON.parse(storedQuotes);
selectedCategory = storedSelectedCategory;
populateCategories();
}
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
const jsonQuotes = JSON.stringify(quotes, null, 2);
const blob = new Blob([jsonQuotes], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'quotes.json';
a.click();
URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
const fileReader = new FileReader();
fileReader.onload = function(event) {
try {
const importedQuotes = JSON.parse(event.target.result);
quotes = importedQuotes;
saveQuotesToLocalStorage();
displayRandomQuote();
alert('Quotes imported successfully!');
} catch (error) {
alert('Error importing quotes: ' + error.message);
}
};
fileReader.readAsText(event.target.files[0]);
}

// Function to populate categories
function populateCategories() {
const categoryFilter = document.getElementById("categoryFilter");
const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
uniqueCategories.forEach(category => {
const option = document.createElement("option");
option.value = category;
option.text = category;
categoryFilter.appendChild(option);
});
if (selectedCategory) {
categoryFilter.value = selectedCategory;
}
}

// Function to filter quotes
function filterQuote() {
const categoryFilter = document.getElementById("categoryFilter");
selectedCategory = categoryFilter.value;
saveQuotesToLocalStorage();
const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
const quoteDisplay = document.getElementById("quoteDisplay");
quoteDisplay.innerHTML = '';
filteredQuotes.forEach(quote => {
const quoteElement = document.createElement("p");
quoteElement.textContent = ${quote.text} (${quote.category});
quoteDisplay.appendChild(quoteElement);
});
}

// Load quotes from Local Storage when the application initializes
loadQuotesFromLocalStorage();
displayRandomQuote();

// Event listeners
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);
document.getElementById("categoryFilter").addEventListener("change", filterQuote);
