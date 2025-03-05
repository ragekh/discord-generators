import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ServerRulesIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import ProTips from '../components/ProTips';
import ProChecklist from '../components/ProChecklist';

export default function ServerRulesGenerator() {
  const [serverName, setServerName] = useState('');
  const [serverFocus, setServerFocus] = useState('');
  const [moderationStyle, setModerationStyle] = useState('');
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
      const response = await axios.post('http://localhost:5001/api/generate-server-rules', { 
        serverName,
        serverFocus,
        moderationStyle,
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
  const serverRulesSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Discord Server Rules Generator',
    'url': 'https://discord-ai-generators.com/server-rules',
    'description': 'Create clear and comprehensive Discord server rules with our free AI generator. Enter your server details to get customized rules instantly!',
    'applicationCategory': 'UtilityApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web'
  };

  // Predefined moderation style options
  const moderationStyleOptions = [
    "Strict",
    "Moderate",
    "Relaxed",
    "Community-led",
    "Age-appropriate (13+)",
    "Age-appropriate (18+)",
    "Professional",
    "Educational",
    "Custom"
  ];

  return (
    <>
      <SEO
        title="Discord Server Rules Generator - Clear Community Guidelines"
        description="Create clear and comprehensive Discord server rules with our free AI generator. Enter your server details to get customized rules instantly!"
        keywords="Discord server rules, community guidelines, Discord moderation, server rules template, Discord TOS compliant rules"
        schema={serverRulesSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#F6F6FE] rounded-full mb-4">
            <div className="text-[#5865F2]">
              <ServerRulesIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Discord Server Rules Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create clear, fair, and comprehensive rules for your Discord server. Well-defined rules help maintain a positive community and set expectations for all members.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Server Name:</label>
            <input
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              placeholder="e.g., Gaming Legends, Art Haven, Tech Support"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Server Focus:</label>
            <textarea
              value={serverFocus}
              onChange={(e) => setServerFocus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              rows="3"
              placeholder="Describe your server's purpose, community, and activities. What kind of content is shared? What's the age range of your members?"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Moderation Style:</label>
            <select
              value={moderationStyle}
              onChange={(e) => setModerationStyle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              required
            >
              <option value="" disabled>Select a moderation style</option>
              {moderationStyleOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {moderationStyle === "Custom" && (
              <textarea
                value={moderationStyle === "Custom" ? "" : moderationStyle}
                onChange={(e) => setModerationStyle(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
                rows="2"
                placeholder="Describe your custom moderation style"
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
              'Generate Server Rules'
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
          <ProTips category="server-rules" />
        </div>
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2C2F33]">
                  {loading && regenerating ? 'Regenerating Server Rules...' : 'Generated Server Rules:'}
                </h2>
                {!loading && <CopyButton text={result} />}
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 relative">
                {loading && regenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                    <LoadingSpinner size="lg" color="#5865F2" />
                  </div>
                )}
                <div className="whitespace-pre-wrap text-gray-800">{loading && regenerating ? previousResult : result}</div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Tip: You can use Discord's markdown formatting to make your rules more readable. Consider creating a dedicated #rules channel where these rules are pinned.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#5865F2] hover:text-[#4752C4] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate different rules
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Server Rules Tips - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Server Rules Best Practices</h2>
            <p className="text-gray-600 mb-4">
              Use these tips to implement effective server rules:
            </p>
            <ProChecklist type="server-rules" />
            
            <div className="mt-8 bg-[#F0F9FF] border border-[#B9E6FE] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] mb-2">Why Server Rules Matter</h3>
              <p className="text-sm text-gray-700 mb-3">
                Clear server rules are the foundation of a healthy Discord community. Effective rules:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Set clear expectations for all members</li>
                <li>Provide moderators with guidelines for enforcement</li>
                <li>Create a safer, more welcoming environment</li>
                <li>Reduce conflicts and misunderstandings</li>
                <li>Help your server comply with Discord's Terms of Service</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                Consider requiring members to react to your rules with a specific emoji to gain access to the rest of your server. This ensures they've at least seen the rules before participating.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}