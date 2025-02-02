// Quote generator logic
const quotes = [];
const quoteDisplay = document.getElementById('quote-display');

function addQuote() {
const newQuoteText = document.getElementById('new-quote-text').value;
const newQuoteCategory = document.getElementById('new-quote-category').value;
quotes.push({ text: newQuoteText, category: newQuoteCategory });
displayRandomQuote();
saveQuotesToLocalStorage();
}

function displayRandomQuote() {
const randomIndex = Math.floor(Math.random() * quotes.length);
const randomQuote = quotes[randomIndex];
quoteDisplay.textContent = ${randomQuote.text} (${randomQuote.category});
}

// Data syncing logic
const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

async function fetchDataFromServer() {
try {
const response = await fetch(serverUrl);
const data = await response.json();
return data.map(item => ({ text: item.title, category: item.userId }));
} catch (error) {
console.error('Error fetching data:', error);
}
