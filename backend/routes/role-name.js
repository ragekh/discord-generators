const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-role-name
 * @desc Generate Discord role names based on server theme and role type
 * @access Public
 */
router.post('/', validateRequest(['serverTheme', 'roleType']), async (req, res) => {
  try {
    const { serverTheme, roleType, timestamp } = req.body;
    
    const prompt = `Generate a list of 8-12 creative and thematic Discord role names for a server with the theme "${serverTheme}" for the role type "${roleType}" (e.g., moderators, regular members, VIPs, etc.). List each role name on a new line. The names should be creative, fit the server theme, and be appropriate for Discord. Include a suggested color hex code for each role in parentheses after the name.`;
    
    // Pass timestamp to generateText to control caching
    const result = await generateText(prompt, { max_tokens: 350, timestamp });
    
    res.json({ result });
  } catch (error) {
    console.error('Role Name Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate role names' });
  }
});

module.exports = router;