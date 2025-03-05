const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-webhook
 * @desc Generate webhook configurations for Discord integrations
 * @access Public
 */
router.post('/', validateRequest(['service', 'purpose']), async (req, res) => {
  try {
    const { service, purpose, timestamp } = req.body;
    
    const prompt = `Generate a detailed Discord webhook configuration for integrating with ${service} for the purpose of ${purpose}.
    
    The response should include:
    1. A webhook name and avatar suggestion that fits the integration purpose
    2. Detailed JSON configuration with all necessary parameters (using Discord markdown code blocks for formatting)
    3. Step-by-step instructions on how to set up the webhook in Discord
    4. Step-by-step instructions on how to configure the webhook in ${service}
    5. Examples of events/triggers that would be useful to configure
    6. Any security considerations or best practices for this integration
    
    Format the response in a clear, organized way with appropriate headers and sections. Use Discord markdown formatting like **bold** and *italics* where appropriate.`;
    
    // Pass timestamp to prevent caching when regenerating
    const result = await generateText(prompt, { max_tokens: 600, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Webhook Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate webhook configuration' });
  }
});

module.exports = router;