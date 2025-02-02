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
}

async function syncDataWithServer() {
try {
const serverQuotes = await fetchDataFromServer();
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

// Initialize application
loadQuotesFromLocalStorage();
syncDataWithServer();
setInterval(syncDataWithServer, 10000); // Sync data every 10 seconds

// Add event listeners
document.getElementById('add-quote-btn').addEventListener('click', addQuote);
document.getElementById('export-btn').addEventListener('click', exportToJsonFile);
document.getElementById('import-btn').addEventListener('click', importFromJsonFile);

// Export and import functions
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
