const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-emoji
 * @desc Generate Discord emoji ideas based on theme
 * @access Public
 */
router.post('/', validateRequest(['theme', 'emojiType']), async (req, res) => {
  try {
    const { theme, emojiType, timestamp } = req.body;
    
    // Log the request parameters for debugging
    console.log('Emoji Generator Request:', { theme, emojiType, timestamp });
    
    const prompt = `Generate 5-10 creative emoji ideas for a Discord server with the theme "${theme}" and emoji type "${emojiType}". For each emoji, provide a name (lowercase with underscores) and a brief description. List each emoji on a new line.`;
    
    // Pass timestamp to generateText to control caching
    const result = await generateText(prompt, {
      timestamp,
      max_tokens: 500 // Increase token limit for longer responses
    });
    
    // Log the result for debugging
    console.log('Emoji Generator Result Length:', result.length);
    
    res.json({ result });
  } catch (error) {
    console.error('Emoji Generator Error:', error);
    
    // Provide more detailed error information
    const errorMessage = error.message || 'Failed to generate emoji ideas';
    const errorDetails = {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      requestData: { theme: req.body.theme, emojiType: req.body.emojiType }
    };
    
    console.error('Error Details:', errorDetails);
    res.status(500).json(errorDetails);
  }
});

module.exports = router;