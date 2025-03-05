const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-server-name
 * @desc Generate Discord server name based on keywords
 * @access Public
 */
router.post('/', validateRequest(['keywords']), async (req, res) => {
  try {
    const { keywords, timestamp } = req.body;
    
    const prompt = `You are an expert in naming Discord servers. Generate 5-10 unique, catchy, and memorable server names for a Discord server focused on "${keywords}". List each name on a new line.`;
    
    // Pass timestamp to generateText to control caching
    const result = await generateText(prompt, { timestamp });
    
    res.json({ result });
  } catch (error) {
    console.error('Server Name Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate server name' });
  }
});

module.exports = router;