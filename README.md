# Discord AI Generators

A collection of AI-powered tools to help Discord server owners optimize their servers. Generate server names, server descriptions, channel names, welcome messages, bot commands, role names, server rules, and announcements with the power of AI.

This project is designed to be easily adaptable for other AI generator applications. You can clone this repository and modify it to create AI generators for different platforms or use cases by simply changing the prompts and UI elements.

## Features

- **Server Name Generator**: Create unique and memorable names for your Discord server
- **Server Description Generator**: Write compelling server descriptions that attract new members
- **Channel Name Generator**: Generate organized and thematic channel names
- **Welcome Message Generator**: Create engaging welcome messages for new members
- **Bot Command Generator**: Generate custom bot commands and responses
- **Role Name Generator**: Create thematic role names that fit your server
- **Server Rules Generator**: Generate clear and comprehensive server rules
- **Announcement Generator**: Create engaging announcements for your server
- **Event Generator**: Create event descriptions and schedules for Discord events
- **Poll Generator**: Create engaging polls for Discord servers
- **Webhook Generator**: Create webhook configurations for Discord integrations
- **Moderation Response Generator**: Create templates for moderator responses to rule violations

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Express.js, Node.js
- **AI**: OpenRouter API (using Meta Llama 3.3 70B model)

## Project Structure

```
discord-generators/
├── backend/               # Express.js backend
│   ├── index.js           # Main server file
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   └── utils/             # Utility functions
└── frontend/              # Next.js frontend
    ├── components/        # React components
    ├── pages/             # Next.js pages
    ├── public/            # Static assets
    ├── scripts/           # Build scripts
    └── styles/            # CSS styles
```

## Prerequisites

- Node.js (v18.17 or higher)
- npm or yarn
- OpenRouter API key (sign up at [openrouter.ai](https://openrouter.ai/))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ragekh/discord-generators.git
   cd discord-generators
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key
   PORT=5001
   NODE_ENV=development
   ```

## Running Locally

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   The backend server will run on http://localhost:5001

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

## Deployment

### Backend Deployment

1. Set up environment variables on your hosting platform:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `PORT`: The port to run the server on (often set by the hosting platform)
   - `NODE_ENV`: Set to "production"

2. Deploy the backend:
   ```bash
   cd backend
   npm start
   ```

### Frontend Deployment

1. Build the frontend for production:
   ```bash
   cd frontend
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

Alternatively, you can deploy the frontend to Vercel:

```bash
npm install -g vercel
vercel
```

## Environment Variables

### Backend

- `OPENROUTER_API_KEY`: Your OpenRouter API key
- `PORT`: The port to run the server on (default: 5001)
- `NODE_ENV`: The environment to run the server in (development/production)

### Frontend

- No environment variables are required for the frontend in development.
- For production, you may need to set the backend API URL if it's different from the default.

## Customizing AI Prompts

The AI prompts used by the generators are defined in the route files in the `backend/routes` directory. Each generator has its own route file with a specific prompt.

### Checking Prompts

To check the current prompts:

1. Navigate to the `backend/routes` directory
2. Open the route file for the generator you want to check:
   - `server-name.js` - Server Name Generator
   - `server-description.js` - Server Description Generator
   - `channel-name.js` - Channel Name Generator
   - `welcome-message.js` - Welcome Message Generator
   - `bot-command.js` - Bot Command Generator
   - `role-name.js` - Role Name Generator
   - `server-rules.js` - Server Rules Generator
   - `announcement.js` - Announcement Generator

3. Look for the `prompt` variable in each file, which contains the text sent to the AI model.

Example from `server-name.js`:
```javascript
const prompt = `You are an expert in naming Discord servers. Generate 5-10 unique, catchy, and memorable server names for a Discord server focused on "${keywords}". List each name on a new line.`;
```

### Editing Prompts

To modify a prompt:

1. Open the route file for the generator you want to modify
2. Edit the `prompt` string to change the instructions given to the AI model
3. Save the file and restart the backend server for the changes to take effect

When editing prompts, keep in mind:
- Be specific about the format you want the AI to return
- Include any special instructions about style, tone, or formatting
- Maintain the template variables (like `${keywords}`, `${serverName}`, etc.) that are replaced with user input

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [OpenRouter](https://openrouter.ai/) for providing access to various AI models
- [Meta](https://ai.meta.com/) for the Llama 3.3 70B model
- [Next.js](https://nextjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Discord](https://discord.com/) for the inspiration