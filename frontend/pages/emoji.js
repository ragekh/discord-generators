import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { EmojiIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import ProTips from '../components/ProTips';
import ProChecklist from '../components/ProChecklist';

export default function EmojiGenerator() {
  const [theme, setTheme] = useState('');
  const [emojiType, setEmojiType] = useState('');
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
      
      // Log the request data for debugging
      console.log('Sending request with data:', { theme, emojiType, timestamp });
      
      const response = await axios.post('http://localhost:5001/api/generate-emoji', {
        theme,
        emojiType,
        timestamp // Add timestamp to make each request unique
      });
      
      // Log the response for debugging
      console.log('Received response:', response.data);
      
      setResult(response.data.result);
    } catch (err) {
      // Log the error for debugging
      console.error('API Error:', err);
      
      // Provide more specific error messages
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Server error: ${err.response.data?.error || err.response.status}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error: ${err.message || 'Something went wrong'}`);
      }
      
      // If error occurs during regeneration, keep the previous result
      if (regenerating) {
        setResult(previousResult);
      }
    }
    
    setLoading(false);
    setRegenerating(false);
  };

  // Schema for this specific page
  const emojiSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Discord Emoji Generator',
    'url': 'https://discord-ai-generators.com/emoji',
    'description': 'Create custom emoji ideas for your Discord server with our free AI generator. Enter your server theme to get emoji ideas instantly!',
    'applicationCategory': 'UtilityApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web'
  };

  // Predefined emoji type options
  const emojiTypeOptions = [
    "Reactions",
    "Emotes",
    "Server-specific",
    "Animated",
    "Memes",
    "Cute/Kawaii",
    "Pixel Art",
    "Text-based",
    "Custom"
  ];

  return (
    <>
      <SEO
        title="Discord Emoji Generator - Custom Emoji Ideas"
        description="Create custom emoji ideas for your Discord server with our free AI generator. Enter your server theme to get emoji ideas instantly!"
        keywords="Discord emoji, custom emoji, Discord emotes, server emoji ideas, Discord emoji generator"
        schema={emojiSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#F6F6FE] rounded-full mb-4">
            <div className="text-[#5865F2]">
              <EmojiIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Discord Emoji Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create custom emoji ideas for your Discord server. Generate creative and thematic emoji concepts that match your server's style and enhance member engagement.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Server Theme:</label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              placeholder="e.g., Gaming, Art, Tech Support, Anime, Music"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Emoji Type:</label>
            <select
              value={emojiType}
              onChange={(e) => setEmojiType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              required
            >
              <option value="" disabled>Select an emoji type</option>
              {emojiTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {emojiType === "Custom" && (
              <input
                type="text"
                value={emojiType === "Custom" ? "" : emojiType}
                onChange={(e) => {
                  const customValue = e.target.value.trim();
                  // If the user enters a custom value, use it
                  if (customValue !== "") {
                    setEmojiType(customValue);
                  } else {
                    // If the input is empty, keep "Custom" as the value
                    setEmojiType("Custom");
                  }
                }}
                onBlur={(e) => {
                  // If the field is empty on blur, set a default value
                  if (e.target.value.trim() === "") {
                    setEmojiType("Custom Emoji");
                  }
                }}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
                placeholder="Enter custom emoji type"
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
              'Generate Emoji Ideas'
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
          <ProTips category="emoji" />
        </div>
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2C2F33]">
                  {loading && regenerating ? 'Regenerating Emoji Ideas...' : 'Generated Emoji Ideas:'}
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
                <p>Tip: Discord emoji names must be lowercase with no spaces. You can use underscores instead of spaces. Emoji can be up to 32x32 pixels for best results.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#5865F2] hover:text-[#4752C4] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate more emoji ideas
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Emoji Tips - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Emoji Best Practices</h2>
            <p className="text-gray-600 mb-4">
              Use these tips to create effective Discord emojis:
            </p>
            <ProChecklist type="emoji" />
            
            <div className="mt-8 bg-[#F0F9FF] border border-[#B9E6FE] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] mb-2">Why Custom Emojis Matter</h3>
              <p className="text-sm text-gray-700 mb-3">
                Custom emojis enhance your Discord server's unique identity and member experience. Good custom emojis:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Create a unique server identity and brand</li>
                <li>Enhance communication with server-specific reactions</li>
                <li>Increase member engagement and interaction</li>
                <li>Make your server more memorable and fun</li>
                <li>Provide visual cues for server-specific references</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                Remember that Discord servers have emoji slots based on server boost level. Standard servers get 50 emoji slots, while servers with higher boost levels can have up to 500 emoji slots.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}