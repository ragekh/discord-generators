import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ServerNameIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import ProTips from '../components/ProTips';
import ProChecklist from '../components/ProChecklist';

export default function ServerNameGenerator() {
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState('');
  const [previousResult, setPreviousResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [regenerating, setRegenerating] = useState(false);
  const resultRef = useRef(null);
  
  // Predefined keyword suggestions
  const keywordSuggestions = [
    "Gaming",
    "Art",
    "Music",
    "Technology",
    "Anime",
    "Movies",
    "Books",
    "Programming",
    "Fitness",
    "Food",
    "Travel",
    "Photography",
    "Memes",
    "Education",
    "Science"
  ];
  
  // Function to add a suggestion to the keywords
  const addSuggestion = (suggestion) => {
    if (keywords.trim() === '') {
      setKeywords(suggestion);
    } else if (!keywords.toLowerCase().includes(suggestion.toLowerCase())) {
      setKeywords(prev => `${prev}, ${suggestion}`);
    }
  };

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
      const response = await axios.post('http://localhost:5001/api/generate-server-name', { 
        keywords,
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
  const serverNameSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Discord Server Name Generator',
    'url': 'https://discord-ai-generators.com/server-name',
    'description': 'Create unique and catchy Discord server names with our free AI generator. Enter keywords to get personalized server name ideas instantly!',
    'applicationCategory': 'UtilityApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web'
  };

  return (
    <>
      <SEO
        title="Discord Server Name Generator - Unique Names for Your Server"
        description="Create unique and catchy Discord server names with our free AI generator. Enter keywords to get personalized server name ideas instantly!"
        keywords="Discord server name generator, unique Discord server names, AI server name tool, Discord branding, creative server names, community name generator"
        schema={serverNameSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#F6F6FE] rounded-full mb-4">
            <div className="text-[#5865F2]">
              <ServerNameIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Discord Server Name Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Need a standout name for your Discord server? Enter keywords or a brief description of your server focus to generate creative, memorable names tailored to your community.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <label className="block mb-2 font-semibold">Enter keywords or server focus:</label>
          <textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
            rows="3"
            placeholder="e.g., gaming, anime, art community, tech support"
            required
          />
          
          {/* Keyword Suggestions */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Popular keywords (click to add):</p>
            <div className="flex flex-wrap gap-2">
              {keywordSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => addSuggestion(suggestion)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
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
              'Generate Server Names'
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
          <ProTips category="server-name" />
        </div>
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2C2F33]">
                  {loading && regenerating ? 'Regenerating Server Names...' : 'Generated Server Names:'}
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
                <p>Tip: Choose a name that's memorable, easy to spell, and reflects your community's identity.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#5865F2] hover:text-[#4752C4] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate more names
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Server Name Checklist - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Server Name Checklist</h2>
            <p className="text-gray-600 mb-4">
              Use this checklist to ensure your server name is optimized for discovery and appeal:
            </p>
            <ProChecklist type="server-name" />
            
            <div className="mt-8 bg-[#F0F9FF] border border-[#B9E6FE] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] mb-2">Why Your Server Name Matters</h3>
              <p className="text-sm text-gray-700 mb-3">
                Your Discord server name is more than just a label—it's the foundation of your community identity. A well-chosen name can:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Make your server more memorable to potential members</li>
                <li>Communicate your server's purpose at a glance</li>
                <li>Attract members who are interested in your specific community focus</li>
                <li>Build a sense of identity and belonging among members</li>
                <li>Differentiate your server from others in your niche</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                Take time to choose a name that aligns with your server's purpose, resonates with your target audience, and has potential for long-term growth.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}