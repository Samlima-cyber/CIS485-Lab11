const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Load candidates data
let candidates = JSON.parse(fs.readFileSync('candidates.json', 'utf8'));

// Home Route – Improved for browser
app.get('/', (req, res) => {
  res.send(`
    <h1>Fictitious Political Candidates Server</h1>
    <p>Welcome! Use the following endpoints to search or filter candidates:</p>
    <ul>
      <li><strong>GET</strong> <code>/search?party=Cheese Liberators</code></li>
      <li><strong>GET</strong> <code>/search?party=Jam Union&platform=Spread</code></li>
      <li><strong>POST</strong> <code>/filter</code> (with JSON body)</li>
    </ul>
    <p>Example POST body:</p>
    <pre>{
  "platform": "Pro-Biscuit Legislation",
  "slogan": "A Biscuit in Every Hand"
}</pre>
  `);
});

// GET /search with query parameters
app.get('/search', (req, res) => {
  const { party, platform } = req.query;
  let filteredCandidates = candidates;

  if (party) {
    filteredCandidates = filteredCandidates.filter(c => c.party === party);
  }

  if (platform) {
    filteredCandidates = filteredCandidates.filter(c =>
      c.platform.includes(platform)
    );
  }

  if (filteredCandidates.length > 0) {
    res.json(filteredCandidates);
  } else {
    res.status(404).json({ message: 'No candidates found' });
  }
});

// POST /filter with JSON body
app.post('/filter', (req, res) => {
  const { platform, slogan } = req.body;
  let filteredCandidates = candidates;

  if (platform) {
    filteredCandidates = filteredCandidates.filter(c =>
      c.platform.includes(platform)
    );
  }

  if (slogan) {
    filteredCandidates = filteredCandidates.filter(c =>
      c.slogan.includes(slogan)
    );
  }

  if (filteredCandidates.length > 0) {
    res.json(filteredCandidates);
  } else {
    res.status(404).json({ message: 'No candidates found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});