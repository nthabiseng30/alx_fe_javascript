// Array of quote objects
let quotes = [
{ text: "Quote 1", category: "Inspirational" },
{ text: "Quote 2", category: "Motivational" },
{ text: "Quote 3", category: "Funny" },
];

// Function to display a random quote
function displayRandomQuote() {
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
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteElement = document.createElement("p");
newQuoteElement.textContent = ${newQuoteText} (${newQuoteCategory});
quoteDisplay.appendChild(newQuoteElement);
document.getElementById("newQuoteText").value = "";
document.getElementById("newQuoteCategory").value = "";
}
}

// Function to create the add quote form
function createAddQuoteForm() {}

// Function to show a random quote
function showRandomQuote() {
displayRandomQuote();
}

// Event listener for the "Show New Quote" button
document.getElementById("showNewQuote").addEventListener("click", function(){
displayRandomQuote();
});

// Event listener for the "Add Quote" button
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Initial call to display a random quote
displayRandomQuote();

// Update the quote display every 10 seconds
setInterval(displayRandomQuote, 10000);
