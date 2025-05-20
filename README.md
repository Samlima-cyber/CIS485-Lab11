# Lab 11: Candidate Form Submission and Display

**Course:** CIS 485 - Web Programming II  
**Student:** Sam Lima  

## 🧠 Objective
This project adds form processing and JSON storage to an Express app.  
It allows users to:
- Submit new political candidates via an HTML form
- Store them in a `candidates.json` file
- Display all candidates in a styled HTML layout

---

## 🚀 Setup Instructions

1. Install dependencies:
```bash
npm install express
Start the server:

bash
Copy
Edit
node server.js
Visit in browser:

http://localhost:3000

http://localhost:3000/add-candidate

http://localhost:3000/candidates

📌 Features
🔹 GET /add-candidate
Renders a form to enter:

Name

Party

Platform

Slogan

🔹 POST /add-candidate
Receives form data, appends it to candidates.json, and redirects to /candidates.

🔹 GET /candidates
Displays all candidates with their info in styled boxes.

📁 Folder Structure
pgsql
Copy
Edit
candidate-lab/
├── server.js
├── candidates.json
├── package.json
└── node_modules/
✅ Example Flow
Navigate to /add-candidate

Submit a new candidate

Automatically redirected to /candidates

Candidate is displayed and persisted to candidates.json
