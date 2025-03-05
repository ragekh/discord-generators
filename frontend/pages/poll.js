import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { PollIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import ProTips from '../components/ProTips';
import ProChecklist from '../components/ProChecklist';

export default function PollGenerator() {
  const [topic, setTopic] = useState('');
  const [details, setDetails] = useState('');
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
      const response = await axios.post('http://localhost:5001/api/generate-poll', { 
        topic,
        details,
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
  const pollSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Discord Poll Generator',
    'url': 'https://discord-ai-generators.com/poll',
    'description': 'Create engaging polls for your Discord server with our free AI generator. Enter your poll topic to get professional poll options instantly!',
    'applicationCategory': 'UtilityApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web'
  };

  // Predefined poll topic suggestions
  const pollTopicSuggestions = [
    "Server Improvements",
    "Event Planning",
    "Game Preferences",
    "Community Feedback",
    "Content Creation",
    "Server Activities",
    "Member Interests",
    "Role Suggestions",
    "Bot Features",
    "Channel Organization"
  ];

  return (
    <>
      <SEO
        title="Discord Poll Generator - Create Engaging Community Polls"
        description="Create engaging polls for your Discord server with our free AI generator. Enter your poll topic to get professional poll options instantly!"
        keywords="Discord polls, server polls, Discord voting, community feedback, Discord reactions"
        schema={pollSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#F6F6FE] dark:bg-[#2F3136] rounded-full mb-4">
            <div className="text-[#5865F2]">
              <PollIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Discord Poll Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create engaging polls for your Discord server. Whether you're gathering feedback, planning events, or just having fun, our generator will help you craft clear and engaging polls with multiple options.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#36393F] p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 mb-6">
          <div className="mb-4">
            <label className="block mb-2 font-semibold dark:text-gray-200">Poll Topic:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-[#2F3136] dark:text-gray-200 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              placeholder="What would you like to poll your community about?"
              required
            />
            <div className="mt-2">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {pollTopicSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setTopic(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-1 px-2 rounded transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold dark:text-gray-200">Additional Details:</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-[#2F3136] dark:text-gray-200 rounded-md mb-4 focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              rows="4"
              placeholder="Provide any additional context or specific options you'd like to include in the poll. The more details you provide, the more tailored your poll will be."
              required
            />
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
              'Generate Poll'
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
          <ProTips category="poll" />
        </div>
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white dark:bg-[#36393F] p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2C2F33] dark:text-gray-200">
                  {loading && regenerating ? 'Regenerating Poll...' : 'Generated Poll:'}
                </h2>
                {!loading && <CopyButton text={result} />}
              </div>
              <div className="bg-gray-50 dark:bg-[#2F3136] p-4 rounded-md border border-gray-200 dark:border-gray-700 relative">
                {loading && regenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-[#36393F] bg-opacity-70 z-10">
                    <LoadingSpinner size="lg" color="#5865F2" />
                  </div>
                )}
                <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{loading && regenerating ? previousResult : result}</div>
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>Tip: The poll includes Discord markdown formatting. You can further customize it with emojis, mentions, and additional formatting before posting.</p>
                <p className="mt-2">To create a reaction poll, add emoji reactions to your message after posting it. Members can then vote by clicking those reactions.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#5865F2] hover:text-[#4752C4] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate another poll
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Poll Tips - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Poll Best Practices</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Use these tips to make your Discord polls more effective:
            </p>
            <ProChecklist type="poll" />
            
            <div className="mt-8 bg-[#F0F9FF] dark:bg-[#2F3136] border border-[#B9E6FE] dark:border-[#4752C4] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] dark:text-[#5865F2] mb-2">Why Polls Matter</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Well-designed polls are essential for gathering community feedback and increasing engagement. Effective polls:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>Increase member participation and investment in the community</li>
                <li>Provide valuable insights into member preferences and opinions</li>
                <li>Help guide server decisions based on community feedback</li>
                <li>Create opportunities for discussion and interaction</li>
                <li>Make members feel their opinions are valued</li>
              </ul>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                Consider using specialized poll bots for more advanced polling features, or use Discord's built-in reaction system for simple polls. For important polls, pin them to ensure visibility and announce them in your server.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}