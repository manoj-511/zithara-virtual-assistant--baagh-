const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const userMessage = req.body.message;

  const options = {
    method: 'POST',
    url: 'https://chatgpt4o-ai-chatbot.p.rapidapi.com/chat2.php',
    headers: {
      'x-rapidapi-key': 'acc37c253cmsh31688b73dcc3787p148f7djsn30e18bb0669b',
      'x-rapidapi-host': 'chatgpt4o-ai-chatbot.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: {
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    },
  };

  try {
    const response = await axios.request(options);
    const botReply = response.data.response;
    res.json({ reply: botReply });
  } catch (error) {
    console.error('Error calling chatbot API:', error.message);
    res.status(500).json({ error: 'Failed to get response from bot.' });
  }
});

module.exports = router; // ✅ This line is critical
