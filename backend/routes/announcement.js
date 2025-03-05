const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-announcement
 * @desc Generate Discord server announcement based on announcement type and details
 * @access Public
 */
router.post('/', validateRequest(['announcementType', 'details']), async (req, res) => {
  try {
    const { announcementType, details, timestamp } = req.body;
    
    const prompt = `Generate a clear, engaging Discord server announcement for ${announcementType} with these details: ${details}. The announcement should be attention-grabbing, informative, and formatted appropriately for Discord (can include emojis, basic markdown like **bold** and *italics*). Make it exciting and community-focused.`;
    
    // Pass timestamp to prevent caching when regenerating
    const result = await generateText(prompt, { max_tokens: 300, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Announcement Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate announcement' });
  }
});

module.exports = router;