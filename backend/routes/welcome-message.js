const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-welcome-message
 * @desc Generate Discord welcome message based on server theme and details
 * @access Public
 */
router.post('/', validateRequest(['serverName', 'serverTheme']), async (req, res) => {
  try {
    const { serverName, serverTheme, timestamp } = req.body;
    
    const prompt = `Write a friendly and engaging welcome message for new members joining a Discord server named "${serverName}" with the theme "${serverTheme}". Include a brief introduction to the server, mention 2-3 key channels they should check out, and encourage them to introduce themselves. The message should be warm, inclusive, and reflect the server's theme.`;
    
    // Pass timestamp to prevent caching when regenerating
    const result = await generateText(prompt, { max_tokens: 350, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Welcome Message Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate welcome message' });
  }
});

module.exports = router;