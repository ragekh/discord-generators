const express = require('express');
const router = express.Router();

// Import route modules
const serverNameRoutes = require('./server-name');
const serverDescriptionRoutes = require('./server-description');
const channelNameRoutes = require('./channel-name');
const welcomeMessageRoutes = require('./welcome-message');
const botCommandRoutes = require('./bot-command');
const roleNameRoutes = require('./role-name');
const serverRulesRoutes = require('./server-rules');
const announcementRoutes = require('./announcement');

// Register routes
router.use('/api/generate-server-name', serverNameRoutes);
router.use('/api/generate-server-description', serverDescriptionRoutes);
router.use('/api/generate-channel-name', channelNameRoutes);
router.use('/api/generate-welcome-message', welcomeMessageRoutes);
router.use('/api/generate-bot-command', botCommandRoutes);
router.use('/api/generate-role-name', roleNameRoutes);
router.use('/api/generate-server-rules', serverRulesRoutes);
router.use('/api/generate-announcement', announcementRoutes);

module.exports = router;