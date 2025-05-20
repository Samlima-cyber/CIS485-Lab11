const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true })); // for form POST
app.use(express.json()); // for JSON API

// Load candidates from file
let candidates = JSON.parse(fs.readFileSync('candidates.json', 'utf8'));

// Home Route
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to the Fictitious Political Candidates Server</h1>
  <p><a href="/add-candidate">Add a Candidate</a> | <a href="/candidates">View All Candidates</a></p>`);
});

// Task 1: GET form
app.get('/add-candidate', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Add New Candidate</title>
      </head>
      <body>
        <h1>Add a New Political Candidate</h1>
        <form action="/add-candidate" method="POST">
          <label for="name">Name:</label><br>
          <input type="text" id="name" name="name" required><br>
          <label for="party">Party:</label><br>
          <input type="text" id="party" name="party" required><br>
          <label for="platform">Platform:</label><br>
          <input type="text" id="platform" name="platform" required><br>
          <label for="slogan">Slogan:</label><br>
          <input type="text" id="slogan" name="slogan" required><br><br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

// Task 2: POST form submission
app.post('/add-candidate', (req, res) => {
  const { name, party, platform, slogan } = req.body;
  const newCandidate = {
    id: candidates.length + 1,
    name,
    party,
    platform,
    slogan
  };
  candidates.push(newCandidate);
  fs.writeFileSync('candidates.json', JSON.stringify(candidates, null, 2));
  res.redirect('/candidates');
});

// Task 3: Display candidates
app.get('/candidates', (req, res) => {
  let candidatesHtml = candidates.map(candidate => `
    <div class="candidate-box">
      <h2>${candidate.name}</h2>
      <p><strong>Party:</strong> ${candidate.party}</p>
      <p><strong>Platform:</strong> ${candidate.platform}</p>
      <p><strong>Slogan:</strong> ${candidate.slogan}</p>
    </div>
  `).join('');

  res.send(`
    <html>
      <head>
        <title>Candidate List</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          .candidate-box {
            display: flex;
            flex-direction: column;
            border: 1px solid #ccc;
            padding: 15px;
            margin: 10px 0;
            background-color: #f9f9f9;
            border-radius: 5px;
          }
          .candidate-box h2 {
            margin: 0 0 10px;
            font-size: 24px;
          }
        </style>
      </head>
      <body>
        <h1>All Political Candidates</h1>
        ${candidatesHtml}
        <p><a href="/add-candidate">Add Another Candidate</a></p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});