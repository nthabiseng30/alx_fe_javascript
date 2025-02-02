// Quote generator logic
const quotes = [];
const quoteDisplay = document.getElementById('quote-display');

function addQuote() {
  const newQuoteText = document.getElementById('new-quote-text').value;
  const newQuoteCategory = document.getElementById('new-quote-category').value;
  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  displayRandomQuote();
}

function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `${randomQuote.text} (${randomQuote.category})`;
}

// Data syncing logic
const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

function fetchDataFromServer() {
  return fetch(serverUrl)
    .then(response => response.json())
    .then(data => data.map(item => ({ text: item.title, category: item.userId })));
}

function syncDataWithServer() {
  fetchDataFromServer()
    .then(serverQuotes => {
      const localQuotes = quotes;
      const conflicts = checkForConflicts(localQuotes, serverQuotes);
      if (conflicts.length > 0) {
        handleConflicts(conflicts);
      } else {
        updateLocalQuotesAndStorage(localQuotes, serverQuotes);
      }
    })
    .catch(error => console.error('Error syncing data:', error));
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
    dismissConf
