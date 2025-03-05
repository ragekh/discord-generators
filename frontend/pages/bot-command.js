import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { BotCommandIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import ProTips from '../components/ProTips';
import ProChecklist from '../components/ProChecklist';

export default function BotCommandGenerator() {
  const [botName, setBotName] = useState('');
  const [botPurpose, setBotPurpose] = useState('');
  const [result, setResult] = useState('');
  const [previousResult, setPreviousResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [regenerating, setRegenerating] = useState(false);
  const resultRef = useRef(null);

  // Scroll to results when they're generated
  useEffect(() => {
    if (result && resultRef.current) {
      // Scroll to results with smooth animation
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [result]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Prevent multiple submissions
    if (loading) return;
    
    setLoading(true);
    setError('');
    
    // If we already have results, we're regenerating
    if (result) {
      setRegenerating(true);
      setPreviousResult(result);
    } else {
      setResult('');
    }
    
    try {
      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime();
      const response = await axios.post('http://localhost:5001/api/generate-bot-command', { 
        botName,
        botPurpose,
        timestamp // Add timestamp to make each request unique
      });
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      // If error occurs during regeneration, keep the previous result
      if (regenerating) {
        setResult(previousResult);
      }
    }
    
    setLoading(false);
    setRegenerating(false);
  };

  // Schema for this specific page
  const botCommandSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Discord Bot Command Generator',
    'url': 'https://discord-ai-generators.com/bot-command',
    'description': 'Create custom Discord bot commands and responses with our free AI generator. Enter your bot details to get command ideas instantly!',
    'applicationCategory': 'UtilityApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web'
  };

  // Predefined bot purpose options
  const botPurposeOptions = [
    "Moderation",
    "Entertainment",
    "Music",
    "Games",
    "Utility",
    "Information",
    "Welcome & Onboarding",
    "Role Management",
    "Economy & Currency",
    "Leveling & XP",
    "Polls & Voting",
    "Custom"
  ];

  return (
    <>
      <SEO
        title="Discord Bot Command Generator - Custom Bot Commands"
        description="Create custom Discord bot commands and responses with our free AI generator. Enter your bot details to get command ideas instantly!"
        keywords="Discord bot commands, custom bot responses, Discord bot ideas, bot command generator, Discord automation"
        schema={botCommandSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#F6F6FE] rounded-full mb-4">
            <div className="text-[#5865F2]">
              <BotCommandIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Discord Bot Command Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Generate custom bot commands and responses for your Discord server. Create engaging, useful commands that enhance your server's functionality and user experience.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Bot Name:</label>
            <input
              type="text"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              placeholder="e.g., ServerBot, ModeratorBot, FunBot"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Bot Purpose:</label>
            <select
              value={botPurpose}
              onChange={(e) => setBotPurpose(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              required
            >
              <option value="" disabled>Select a purpose</option>
              {botPurposeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {botPurpose === "Custom" && (
              <textarea
                value={botPurpose === "Custom" ? "" : botPurpose}
                onChange={(e) => setBotPurpose(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
                rows="3"
                placeholder="Describe the specific purpose of your bot and what kind of commands you need"
                required
              />
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#5865F2] text-white p-3 rounded-md hover:bg-[#4752C4] transition font-medium flex justify-center items-center"
            disabled={loading}
          >
            {loading && !regenerating ? (
              <>
                <LoadingSpinner size="sm" color="#ffffff" />
                <span className="ml-2">Generating...</span>
              </>
            ) : (
              'Generate Bot Commands'
            )}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {/* Pro Tips Section - Always visible */}
        <div className="mb-6">
          <ProTips category="bot-command" />
        </div>
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2C2F33]">
                  {loading && regenerating ? 'Regenerating Bot Commands...' : 'Generated Bot Commands:'}
                </h2>
                {!loading && <CopyButton text={result} />}
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 relative">
                {loading && regenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                    <LoadingSpinner size="lg" color="#5865F2" />
                  </div>
                )}
                <pre className="whitespace-pre-wrap text-gray-800">{loading && regenerating ? previousResult : result}</pre>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Tip: These commands are ideas that you can implement with bot creation tools like Discord.js, discord.py, or bot creation platforms like BotGhost or Discord Bot Maker.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#5865F2] hover:text-[#4752C4] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate more commands
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Bot Command Tips - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Bot Command Best Practices</h2>
            <p className="text-gray-600 mb-4">
              Use these tips to create effective bot commands:
            </p>
            <ProChecklist type="bot-command" />
            
            <div className="mt-8 bg-[#F0F9FF] border border-[#B9E6FE] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] mb-2">Why Bot Commands Matter</h3>
              <p className="text-sm text-gray-700 mb-3">
                Well-designed bot commands can significantly enhance your Discord server. Good bot commands:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Automate repetitive tasks and moderation</li>
                <li>Provide entertainment and engagement for members</li>
                <li>Create unique interactive experiences specific to your server</li>
                <li>Help new members learn about your server and its features</li>
                <li>Collect feedback and facilitate community interaction</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                When implementing these commands, consider creating a dedicated #bot-commands channel to prevent spam in main chat channels, and create a command list or help command so users know what commands are available.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}