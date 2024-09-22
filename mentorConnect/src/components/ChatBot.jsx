import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loggedInContext } from '../context/context';
import { useContext } from 'react';

function Chatbot() {
  const loggedIn = useContext(loggedInContext);

  const [prompt, setPrompt] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Track if the chatbox is open or closed
  const [conversation, setConversation] = useState([{ sender: 'bot', message: 'How can I help you?' }]); // To store the conversation history

  const navigate = useNavigate();

  const [isTyping, setisTyping] = useState(false);

  const conversationEndRef = useRef(null);

  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleClick = async (e) => {
    e.preventDefault();
    
    const promptt = prompt;
    let prevConversation = [...conversation];
    
    prevConversation.push({ sender: 'user', message: promptt });
    
    setConversation(prevConversation);

    setPrompt('');

    setisTyping(true);

    try {
      // Fetch the bot's reply from the server
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const tmp = await response.json().then((data) => data.reply);
      
      let reply = JSON.stringify(tmp);
      console.log(reply);
      
      reply = reply.slice(1, reply.length - 4);//

      prevConversation.push({ sender: 'bot', message: reply });

      setConversation(prevConversation);

      setisTyping(false);

    } catch (error) {
      console.error('There was an error with the request:', error);
      setisTyping(false);
    }
  };

  const toggleChatbox = () => {
    if(!loggedIn.loggedIn) {
      alert("Please login to access the chatbot");
      navigate("/login");
      return;
    }
    setIsOpen(!isOpen); // Toggle chatbox visibility
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Chatbot bubble icon */}
      <div
        className="rounded-full flex items-center justify-center cursor-pointer"
        onClick={toggleChatbox}
      >
        <img src={isOpen ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThUw66EZvaY0AuHSZocrfWIo4w8tLeI0sCPg&s" : "https://cdn.iconscout.com/icon/free/png-256/free-chat-icon-download-in-svg-png-gif-file-formats--message-communication-chatting-conversation-feedback-pack-business-icons-1794829.png?f=webp&w=256"} alt="Chatbot Icon" className="w-14 rounded-full" />
      </div>

      {/* Chatbox container, visible when `isOpen` is true */}
      {isOpen && (
        <main className="mt-4 w-[30vw] bg-white rounded-lg shadow-lg p-4 min-h-[85vh]">
          {/* Chatbot header */}
          <div className="chatbot-header text-center">
            <img src="https://cdn-icons-png.flaticon.com/512/3940/3940410.png" className="w-16 mx-auto" alt="Logo" />
            <h1 className="text-2xl font-bold">AI Mentor</h1>
            <h2 className="text-gray-500">Ask me anything!</h2>
          </div>

          {/* Chatbot conversation */}
          <div className="mt-4 bg-gray-50 p-4 h-[23rem] rounded-md overflow-y-scroll flex flex-col gap-4 flex-grow">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.sender === 'bot'
                    ? 'bg-blue-200'
                    : 'bg-gray-200'
                } p-2 rounded-lg mb-2 max-w-xs ${
                  msg.sender === 'bot' ? 'self-start' : 'self-end'
                } text-black`}
              >
                {msg.message}
              </div>
            ))}
            {isTyping && (
              <div className="bg-blue-200 p-2 rounded-lg mb-2 max-w-xs self-start text-black">
                Bot is typing...
              </div>
            )}
          <div ref={conversationEndRef}/>
          </div>

          {/* Chatbot input */}
          <form
            id="form"
            className="chatbot-input-container flex items-center mt-4"
            onSubmit={handleClick}
          >
            <input
              name="user-input"
              type="text"
              id="user-input"
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:outline-none"
            />
            <button
              id="submit-btn"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              type="submit"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AlNIAkdEAj9AAjtAAjs8AltP///0AjM/x+fsgm9UnntXb7vXP5/Nhs935/fyLxeSv1+xYr9yBwePt9vri8Pa43O7Z7PY8pNihz+ppt96o0+rE4/Ge0OiUyeZLqtt3vOGz2u3S5vNdrdtGpdi34fKCyuhNtN4Ah80cptdHAAAD20lEQVR4nO2djZaaMBCFlyTK3yIuIKAiuq1t9/2fsIGzdnepWFQsyT33e4LcM5OZyZAMT0+EEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCPnvuNFq6iU8GNcPktyfehWPpZip4BC5Uy/jkWyVI0W5BvZWdyMdR0gnyWEN6YfCcRqR8/R56rU8iKJVqJFeucUMO2v5LtERSmyqeOr1jI+7OFmxFRku8bw1Dj9J1N4qkhc0by085wtCJ8kKK7buOhKb2BrWSEnyy1b88NZ9jhN2/OCMxCa2HoonEHeN5BmFbZIMd9nUixuHXY9EvSPVAsJb3UWfRC3SC9LCfmf1w3Nb8SPsHLfWx9a+rfgn7MwXtpd09eyiRC1S2F7SJZf89F2kLF8sNmQ8/6fCxlvlxt6+R6QGSGxiq70lXT1Moo6ts+TVygPI2QK1z1uDQ2ThlszOFqh9hrSyS1ddobBNkol1JV19OfGfE5kWUy/6OvZXWbFBqnBtU9jxh2TFriFnyqaSrhqaMr6K9ILlsy2VwPKvts1AkXK/9e0QOaBA7TPk3I6ecnbDVvwwZFhb4K3VlSmjo9HZvxpvyOVN0eazyEM0tYZ/cH1W7Ir0gtroLl0W3KnQaVqRRpd0+T1b8UTbpZtaSS93bsUTUh13ph5AjvduxXeENLVLl40jsBWpgqWJ3lrdWL2dFylMvCaQjrMVTxrlbFNNLamDe3dW7IpUQb0yqqRb3VGg9qCTpFHXBEbJih30AcSkLl36AIlNkiyN6SnHY2XFDu1dOjO8dfUYha3IuRkHkPxNPEyklOHOAEPWSRkIIYWUcnytojmAmJA/4lVR5et0sQ+Duc5qSojxxOrYatSH1zh7jqqX5SE5arFaa2PYu8UKtd8aeFyOs1XxTRt28/0YzoXnaT++XatQRnfpYl+LrbbLw0Z7sfDU7CbDCmnDNYG4ERu9rrUX6/DkeUq78XCtTZfOqJLuIq4bx1mUb+t0UQbSG6pTi9wYkSSvxPV//PwVDrSkegtNqegugmpD1H2IGktR8yFqTYNdl8KfLeDPh/BnfPw+DXyvDb5fCt/zxv9uMfa3J2natyf474f434BL9O/48Hcx8jEsaPJ9Gvw7UfD32uDvJsLfL8W/Iwx/zxv+rj78ewv8NzPw757g367Bvz+Ef0OK/w4Y/i03/Ht8/JkK8HMx4GebwM+nydBnDOHPiYKf9QU/rw1+5h7+3ET42Zfw80vhZ9DizxGGnwUNP88bfiY7/lx9+H8joP/fAv8fJfj/mSGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCyGB+A1ENSul6vqiCAAAAAElFTkSuQmCC"
                className="send-btn-icon w-6 h-6 rounded-full"
                alt="Send"
              />
            </button>
          </form>
        </main>
      )}
    </div>
  );
}

export default Chatbot;
