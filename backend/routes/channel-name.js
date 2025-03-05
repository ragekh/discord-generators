const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-channel-name
 * @desc Generate Discord channel names based on server theme and category
 * @access Public
 */
router.post('/', validateRequest(['serverTheme', 'category']), async (req, res) => {
  try {
    const { serverTheme, category, timestamp } = req.body;
    
    const prompt = `Generate a list of 8-12 organized Discord channel names for a server with the theme "${serverTheme}" for the category "${category}". List each channel name on a new line, following Discord's naming convention (lowercase, no spaces, use hyphens instead). Include a mix of text and voice channels, and indicate which is which with [TEXT] or [VOICE] prefix.`;
    
    const result = await generateText(prompt, { max_tokens: 350, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Channel Name Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate channel names' });
  }
});

module.exports = router;