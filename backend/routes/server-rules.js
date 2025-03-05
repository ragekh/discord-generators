const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-server-rules
 * @desc Generate Discord server rules based on server theme, focus, and moderation style
 * @access Public
 */
router.post('/', validateRequest(['serverName', 'serverFocus', 'moderationStyle']), async (req, res) => {
  try {
    const { serverName, serverFocus, moderationStyle, timestamp } = req.body;
    
    const prompt = `Create a comprehensive set of 8-12 Discord server rules for a server named "${serverName}" focused on ${serverFocus}, with a ${moderationStyle} moderation style. The rules should be clear, fair, and help maintain a positive community. Format each rule with a number and a brief explanation of why the rule exists. Include rules about chat etiquette, content restrictions, channel usage, and respect for other members.`;
    
    const result = await generateText(prompt, { max_tokens: 500, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Server Rules Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate server rules' });
  }
});

module.exports = router;