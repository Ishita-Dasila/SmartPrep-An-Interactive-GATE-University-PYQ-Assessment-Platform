process.env.GROQ_API_KEY = "Your-api-key";
console.log("Key loaded:", process.env.GROQ_API_KEY);

// Load environment variables from .env file into process.env
require("dotenv").config();

// Import required modules for server, middleware, and API calls
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

// Create an Express application instance
const app = express();

// Define the port number where server will run
const PORT = 3000;

// Enable Cross-Origin Resource Sharing so frontend can access backend
app.use(cors());

// Parse incoming JSON request body into JavaScript object
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// File paths for data storage
const USERS_FILE = path.join(__dirname, 'users.json');
const HISTORY_FILE = path.join(__dirname, 'history.json');

// Initialize files if they don't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]');
}
if (!fs.existsSync(HISTORY_FILE)) {
  fs.writeFileSync(HISTORY_FILE, '{}');
}

// Default route to check if server is running successfully
app.get("/", (req, res) => {
  res.send("Server is running!"); // send simple response
});

// NEW: Register endpoint
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Add new user
    users.push({ name, email, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    
    // Initialize empty history
    const history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    history[email] = [];
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
    
    res.json({ success: true });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// NEW: Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      res.json({ success: true, name: user.name, email: user.email });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

//  NEW: Get user history
app.get('/api/history/:email', (req, res) => {
  try {
    const history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    res.json(history[req.params.email] || []);
  } catch (err) {
    console.error('Get history error:', err);
    res.json([]);
  }
});

// NEW: Save test result
app.post('/api/history', (req, res) => {
  const { email, result } = req.body;
  
  try {
    const history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    if (!history[email]) history[email] = [];
    history[email].push(result);
    
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error('Save history error:', err);
    res.status(500).json({ error: 'Failed to save result' });
  }
});

// POST API to generate explanation for quiz answers using AI
app.post("/explain", async (req, res) => {
  // Extract required fields from request body sent by frontend
  const { question, options, userAnswer, correctAnswer } = req.body;

  // Validate input to ensure required data is present
  if (!question || !options || !correctAnswer) {
    return res.status(400).json({ reply: "Invalid request data" }); // send error if missing
  }

  try {
    // Make POST request to Groq API for generating explanation
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      // Set headers including content type and authorization token
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      // Send request body with model and prompt details
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",  // using free Groq model
        max_tokens: 300, // limit response length
        // Define the prompt message for AI
        messages: [{
          role: "user",
          content: `You are a helpful quiz tutor. Explain why the answer is correct in 2-3 simple lines.
Question: ${question}
Options: ${options}
User's Answer: ${userAnswer}
Correct Answer: ${correctAnswer}
Keep it short and beginner friendly.` // instruction to AI
        }]
      })
    });

    // Convert API response into JSON format
    const data = await response.json();

    // Log full API response for debugging and understanding output
    console.log("Groq response:", JSON.stringify(data));

    // Extract the generated explanation text from response
    const reply = data.choices[0].message.content;

    // Send the explanation back to frontend as JSON response
    res.json({ reply });
  } catch (err) {
    // Catch and log any error that occurs during API call
    console.log(err);
    // Send generic error response to frontend
    res.status(500).json({ reply: "Something went wrong, please try again." });
  }
});
//  AI SOLUTION API (USED BY QUESTION BANK)
app.post("/api/ai", async (req, res) => {

  const { question, doubt } = req.body;

  if (!question) {
    return res.status(400).json({ answer: "Question missing" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: `
You are a B.Tech exam tutor.

Question:
${question}

Instruction:
${doubt || "Give a short, exam-ready answer in 3-5 points."}

Answer clearly and simply.
            `
          }
        ]
      })
    });

    const data = await response.json();

    console.log("Groq AI:", data);

    const answer = data?.choices?.[0]?.message?.content || "No answer generated";

    res.json({ answer });

  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ answer: "Error generating solution" });
  }
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // log server URL
});
