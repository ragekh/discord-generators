const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-bot-command
 * @desc Generate Discord bot commands and responses based on bot purpose
 * @access Public
 */
router.post('/', validateRequest(['botName', 'botPurpose']), async (req, res) => {
  try {
    const { botName, botPurpose, timestamp } = req.body;
    
    const prompt = `Generate a list of 5-8 useful Discord bot commands and their responses for a bot named "${botName}" with the purpose: "${botPurpose}". For each command, include:
1. The command syntax (e.g., !command or /command)
2. A brief description of what the command does
3. An example of the bot's response when the command is used
4. Any parameters the command might need

Format each command as:
Command: [command syntax]
Description: [what it does]
Parameters: [any required or optional parameters]
Response: [example of bot response]

Ensure the commands are relevant to the bot's purpose and would be useful in a Discord server.`;
    
    const result = await generateText(prompt, { max_tokens: 500, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Bot Command Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate bot commands' });
  }
});

module.exports = router;