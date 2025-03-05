const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-moderation
 * @desc Generate templates for moderator responses to rule violations
 * @access Public
 */
router.post('/', validateRequest(['violationType', 'severity']), async (req, res) => {
  try {
    const { violationType, severity, context, timestamp } = req.body;
    
    let promptContext = '';
    if (context) {
      promptContext = `Additional context: ${context}`;
    }
    
    const prompt = `Generate a professional Discord moderator response template for a ${severity} ${violationType} rule violation. ${promptContext}
    
    The response should include:
    1. A clear and professional greeting
    2. An explanation of which rule was violated and how
    3. The consequences of this violation (warning, timeout, kick, ban, etc.) appropriate for the severity level
    4. An explanation of why the rule exists and why it's important for the community
    5. Instructions for appealing the decision if applicable
    6. A professional closing
    
    Format the response using Discord markdown (bold, italics, etc.) where appropriate to enhance readability. The tone should be firm but fair, professional, and not condescending or overly harsh. The response should be usable as a template that moderators can customize for specific situations.`;
    
    // Pass timestamp to prevent caching when regenerating
    const result = await generateText(prompt, { max_tokens: 500, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Moderation Response Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate moderation response' });
  }
});

module.exports = router;