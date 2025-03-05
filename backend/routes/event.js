const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-event
 * @desc Generate Discord event descriptions and schedules
 * @access Public
 */
router.post('/', validateRequest(['eventType', 'details']), async (req, res) => {
  try {
    const { eventType, details, timestamp } = req.body;
    
    const prompt = `Generate a detailed Discord event description and schedule for a ${eventType} event with these details: ${details}. 
    The response should include:
    1. An attention-grabbing event title
    2. A detailed description of the event (using Discord markdown formatting like **bold** and *italics* where appropriate)
    3. Date and time suggestions (if not specified in the details)
    4. Any requirements or preparations for participants
    5. A brief schedule of activities during the event
    
    Make it exciting, community-focused, and formatted appropriately for Discord.`;
    
    // Pass timestamp to prevent caching when regenerating
    const result = await generateText(prompt, { max_tokens: 500, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Event Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate event description' });
  }
});

module.exports = router;