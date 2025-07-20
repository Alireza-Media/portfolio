const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", author: "William Butler Yeats" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" }
];

let lastIndex = -1;

function getRandomQuote() {
  let idx;
  do {
    idx = Math.floor(Math.random() * quotes.length);
  } while (idx === lastIndex && quotes.length > 1);
  lastIndex = idx;
  return quotes[idx];
}

function displayQuote(quote) {
  const card = document.getElementById('quoteCard');
  const text = document.getElementById('quoteText');
  const author = document.getElementById('quoteAuthor');
  card.style.opacity = 0;
  setTimeout(() => {
    text.textContent = `“${quote.text}”`;
    author.textContent = `— ${quote.author}`;
    card.style.opacity = 1;
  }, 350);
}

document.getElementById('newQuoteBtn').addEventListener('click', () => {
  const quote = getRandomQuote();
  displayQuote(quote);
});
