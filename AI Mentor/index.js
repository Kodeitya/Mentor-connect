const chatbotBubble = document.getElementById("chatbot-bubble");
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotConversation = document.getElementById("chatbot-conversation");
const form = document.getElementById("form");
const userInput = document.getElementById("user-input");

// Toggle chatbot visibility when the bubble is clicked
chatbotBubble.addEventListener("click", () => {
  if (chatbotContainer.classList.contains("open")) {
    chatbotContainer.classList.remove("open");
  } else {
    chatbotContainer.classList.add("open");
  }
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMessage = userInput.value;

  if (userMessage.trim() !== "") {
    appendMessageToChat(userMessage, "human");
    userInput.value = ""; // Clear input field
    fetchReply(userMessage); // Call the backend to get bot response
  }
});

async function fetchReply(userMessage) {
  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userMessage }),
    });

    const data = await response.json();
    const aiMessage = data.reply;

    renderTypewriterText(aiMessage);
  } catch (error) {
    console.error("Error with fetching from backend:", error);
    appendMessageToChat(
      "Sorry, something went wrong. Please try again later.",
      "ai"
    );
  }
}

function appendMessageToChat(text, sender) {
  const speechBubble = document.createElement("div");
  speechBubble.classList.add("speech", `speech-${sender}`);
  speechBubble.textContent = text;
  chatbotConversation.appendChild(speechBubble);
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
}

function renderTypewriterText(text) {
  const newSpeechBubble = document.createElement("div");
  newSpeechBubble.classList.add("speech", "speech-ai", "blinking-cursor");
  chatbotConversation.appendChild(newSpeechBubble);

  let i = 0;
  const interval = setInterval(() => {
    newSpeechBubble.textContent += text.slice(i, i + 1);
    i++;

    if (i >= text.length) {
      clearInterval(interval);
      newSpeechBubble.classList.remove("blinking-cursor");
    }

    chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
  }, 50);
}
