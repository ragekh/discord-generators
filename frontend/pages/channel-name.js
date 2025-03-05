import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ChannelNameIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import ProTips from '../components/ProTips';
import ProChecklist from '../components/ProChecklist';

export default function ChannelNameGenerator() {
  const [serverTheme, setServerTheme] = useState('');
  const [category, setCategory] = useState('');
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
      const response = await axios.post('http://localhost:5001/api/generate-channel-name', { 
        serverTheme,
        category,
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
  const channelNameSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Discord Channel Name Generator',
    'url': 'https://discord-ai-generators.com/channel-name',
    'description': 'Create organized and thematic Discord channel names with our free AI generator. Enter your server theme and category to get channel name ideas instantly!',
    'applicationCategory': 'UtilityApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web'
  };

  // Predefined category options
  const categoryOptions = [
    "General Channels",
    "Chat Channels",
    "Voice Channels",
    "Information Channels",
    "Community Channels",
    "Gaming Channels",
    "Media Channels",
    "Support Channels",
    "Bot Channels",
    "Moderation Channels",
    "Event Channels",
    "Topic-Specific Channels",
    "Other"
  ];

  return (
    <>
      <SEO
        title="Discord Channel Name Generator - Organized Channel Ideas"
        description="Create organized and thematic Discord channel names with our free AI generator. Enter your server theme and category to get channel name ideas instantly!"
        keywords="Discord channel names, Discord channel ideas, server organization, Discord text channels, Discord voice channels, channel naming convention"
        schema={channelNameSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#F6F6FE] rounded-full mb-4">
            <div className="text-[#5865F2]">
              <ChannelNameIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Discord Channel Name Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create organized and thematic channel names for your Discord server. Enter your server theme and the category of channels you need to generate appropriate channel names.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Server Theme:</label>
            <input
              type="text"
              value={serverTheme}
              onChange={(e) => setServerTheme(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              placeholder="e.g., Gaming, Art, Tech Support, Anime, Music"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Channel Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              required
            >
              <option value="" disabled>Select a category</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {category === "Other" && (
              <input
                type="text"
                value={category === "Other" ? "" : category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
                placeholder="Enter custom category"
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
              'Generate Channel Names'
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
          <ProTips category="channel-name" />
        </div>
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2C2F33]">
                  {loading && regenerating ? 'Regenerating Channel Names...' : 'Generated Channel Names:'}
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
                <p>Tip: Discord channel names should be lowercase with no spaces (use hyphens instead). The generator follows this convention.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#5865F2] hover:text-[#4752C4] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate more channel names
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Channel Name Checklist - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Channel Organization Checklist</h2>
            <p className="text-gray-600 mb-4">
              Use this checklist to ensure your channel structure is effective:
            </p>
            <ProChecklist type="channel-name" />
            
            <div className="mt-8 bg-[#F0F9FF] border border-[#B9E6FE] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] mb-2">Why Channel Organization Matters</h3>
              <p className="text-sm text-gray-700 mb-3">
                Well-organized channels are essential for a successful Discord server. Good channel structure:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Makes it easy for members to find relevant conversations</li>
                <li>Reduces confusion and channel clutter</li>
                <li>Creates a more professional server appearance</li>
                <li>Improves overall user experience</li>
                <li>Helps moderate conversations by keeping topics separated</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                Remember to use Discord's category feature to group related channels together, and consider using emojis at the start of channel names to make them more visually distinct.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}