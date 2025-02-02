// Array of quote objects
let quotes = [];

// Function to display a random quote
function displayRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes available.";
    return;
  }
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
    saveQuotesToLocalStorage();
    updateCategories();
    displayRandomQuote();
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }
}

// Function to save quotes to Local Storage
function saveQuotesToLocalStorage() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from Local Storage
function loadQuotesFromLocalStorage() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
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
      updateCategories();
      displayRandomQuote();
      alert('Quotes imported successfully!');
    } catch (error) {
      alert('Error importing quotes: ' + error.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Function to populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = Array.from(new Set(quotes.map(quote => quote.category)));
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.text = category;
    categoryFilter.appendChild(option);
  });
}

// Function to update categories in the dropdown
function updateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = Array.from(new Set(quotes.map(quote => quote.category)));
  categoryFilter.innerHTML = '';
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.text = 'All Categories';
  categoryFilter.appendChild(allOption);
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.text = category;
    categoryFilter.appendChild(option);
  });
  restoreSelectedFilter();
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const categoryFilter = document.getElementById('categoryFilter');
  const selectedCategory = categoryFilter.value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  displayQuotes(filteredQuotes);
  saveSelectedFilter();
}

// Function to display quotes
function displayQuotes(quotes) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';
  quotes.forEach(quote => {
    const quoteElement = document.createElement('p');
    quoteElement.textContent = `${quote.text} (${quote.category})`;
    quoteDisplay.appendChild(quoteElement);
  });
}

// Function to save the last selected category filter
function saveSelectedFilter() {
  localStorage.setItem('selectedFilter', document.getElementById('categoryFilter').value);
}

// Function to restore the last selected category filter
function restoreSelectedFilter() {
  const selected

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
