const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-poll
 * @desc Generate engaging polls for Discord servers
 * @access Public
 */
router.post('/', validateRequest(['topic', 'details']), async (req, res) => {
  try {
    const { topic, details, timestamp } = req.body;
    
    const prompt = `Generate an engaging Discord poll about "${topic}" with these details: ${details}. 
    The response should include:
    1. A clear and attention-grabbing poll question
    2. 4-8 well-crafted poll options that cover a good range of possible answers
    3. A brief introduction explaining the purpose of the poll (using Discord markdown formatting like **bold** and *italics* where appropriate)
    4. A short conclusion with instructions on how to vote (e.g., using reactions)
    
    Make it engaging, community-focused, and formatted appropriately for Discord.`;
    
    // Pass timestamp to prevent caching when regenerating
    const result = await generateText(prompt, { max_tokens: 400, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Poll Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate poll' });
  }
});

module.exports = router;