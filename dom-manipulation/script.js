// Quote generator logic
const quotes = [];
const quoteDisplay = document.getElementById('quote-display');

function addQuote() {
const newQuoteText = document.getElementById('new-quote-text').value;
const newQuoteCategory = document.getElementById('new-quote-category').value;
quotes.push({ text: newQuoteText, category: newQuoteCategory });
displayRandomQuote();
saveQuotesToLocalStorage();
postDataToServer({ text: newQuoteText, category: newQuoteCategory });
}

function displayRandomQuote() {
const randomIndex = Math.floor(Math.random() * quotes.length);
const randomQuote = quotes[randomIndex];
quoteDisplay.textContent = ${randomQuote.text} (${randomQuote.category});
}

// Data syncing logic
const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

function fetchDataFromServer() {
return fetch(serverUrl)
.then(response => response.json())
.then(data => data.map(item => ({ text: item.title, category: item.userId })));
}

async function fetchDataFromServer() {
try {
const response = await fetch(serverUrl);
const data = await response.json();
return data.map(item => ({ text: item.title, category: item.userId }));
} catch (error) {
console.error('Error fetching data:', error);
}
}

function fetchQuotesFromServer() {
return fetchDataFromServer();
}

async function syncDataWithServer() {
try {
const serverQuotes = await fetchQuotesFromServer();
const localQuotes = getQuotesFromLocalStorage();
const conflicts = checkForConflicts(localQuotes, serverQuotes);
if (conflicts.length > 0) {
handleConflicts(conflicts);
} else {
updateLocalQuotesAndStorage(localQuotes, serverQuotes);
}
} catch (error) {
console.error('Error syncing data:', error);
}
}

async function syncQuotes() {
try {
await syncDataWithServer();
} catch (error) {
console.error('Error syncing quotes:', error);
}
}

// Periodically check for new quotes from the server
setInterval(syncQuotes, 10000); // Check every 10 seconds

// Post data to server
async function postDataToServer(quote) {
try {
const response = await fetch(serverUrl, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(quote)
});
const data = await response.json();
console.log('Data posted to server:', data);
} catch (error) {
console.error('Error posting data to server:', error);
}
}

// Local storage functions
function saveQuotesToLocalStorage() {
localStorage.setItem('quotes', JSON.stringify(quotes));
}

function getQuotesFromLocalStorage() {
const storedQuotes = localStorage.getItem('quotes');
return storedQuotes ? JSON.parse(storedQuotes) : [];
}

function loadQuotesFromLocalStorage() {
const storedQuotes = localStorage.getItem('quotes');
if (storedQuotes) {
quotes = JSON.parse(storedQuotes);
}
}

// Conflict resolution logic
function handleConflicts(conflicts) {
const conflictResolutionUi = document.getElementById('conflict-resolution-ui');
conflictResolutionUi.style.display = 'block';
const resolveConflictsBtn = document.getElementById('resolve-conflicts-btn');
resolveConflictsBtn.addEventListener('click', () => {
resolveConflictsManually(conflicts);
});
const dismissConflictsBtn = document.getElementById('dismiss-conflicts-btn');
dismissConflictsBtn.addEventListener('click', () => {
dismissConflicts(conflicts);
});
}

function resolveConflictsManually(conflicts) {
conflicts.forEach(conflict => {
const localQuote = conflict.localQuote;
const serverQuote = conflict.serverQuote;
// Manually resolve conflict here
// For example, you can prompt the user to choose which version to keep
console.log(Conflict detected: ${localQuote.text} vs ${serverQuote.text});
});
}

function dismissConflicts(conflicts) {
conflicts.forEach(conflict => {
const localQuote = conflict.localQuote;
const serverQuote = conflict.serverQuote;
// Dismiss conflict and update data
// For example, you can update the local quote with the server quote
console.log(Conflict dismissed: ${localQuote.text} updated to ${serverQuote.text});
});
}
