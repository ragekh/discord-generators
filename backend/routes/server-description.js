const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-server-description
 * @desc Generate Discord server description based on server name and details
 * @access Public
 */
router.post('/', validateRequest(['serverName', 'description']), async (req, res) => {
  try {
    const { serverName, description, timestamp } = req.body;
    
    const prompt = `Write a compelling and informative Discord server description for a server named "${serverName}" with the following details: ${description}. Keep it concise, engaging, and optimized to attract new members. The description should be under 1000 characters as per Discord's limits.`;
    
    const result = await generateText(prompt, { max_tokens: 400, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Server Description Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate server description' });
  }
});

module.exports = router;