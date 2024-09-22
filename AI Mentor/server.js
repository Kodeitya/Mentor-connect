const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Google Gemini Configuration
const gemini = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

// Endpoint to handle chat requests
app.post("/chat", async (req, res) => {
  console.log(req.body);
  const { prompt } = req.body;

  console.log("aagyi req with Prompt:",prompt);

  try {
    const result = await model.generateContent(prompt);
    res.json({
      reply: result.response.text(),
    });
  } catch (error) {
    console.error("Error with Google Gemini API:", error);
    res.status(500).json({
      error: "Failed to fetch response from Google Gemini API.",
    });
  }
});

app.get('/', (req, res) => {
  res.send('Agyi req');
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
