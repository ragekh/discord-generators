import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ServerDescriptionIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import ProTips from '../components/ProTips';
import ProChecklist from '../components/ProChecklist';

export default function ServerDescriptionGenerator() {
  const [serverName, setServerName] = useState('');
  const [description, setDescription] = useState('');
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
      const response = await axios.post('http://localhost:5001/api/generate-server-description', { 
        serverName,
        description,
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
  const serverDescriptionSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Discord Server Description Generator',
    'url': 'https://discord-ai-generators.com/server-description',
    'description': 'Create compelling Discord server descriptions with our free AI generator. Enter your server details to get a professional description instantly!',
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
        title="Discord Server Description Generator - Attract New Members"
        description="Create compelling Discord server descriptions with our free AI generator. Enter your server details to get a professional description instantly!"
        keywords="Discord server description generator, Discord server about, server description ideas, Discord community description, Discord server bio"
        schema={serverDescriptionSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#F6F6FE] rounded-full mb-4">
            <div className="text-[#5865F2]">
              <ServerDescriptionIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Discord Server Description Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create a compelling description for your Discord server that attracts new members and clearly communicates your server's purpose and community vibe.
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
            <label className="block mb-2 font-semibold">Server Details:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              rows="4"
              placeholder="Describe your server's purpose, community, activities, and what makes it special. Include any specific features, events, or rules you want to highlight."
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
              'Generate Server Description'
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
          <ProTips category="server-description" />
        </div>
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2C2F33]">
                  {loading && regenerating ? 'Regenerating Description...' : 'Generated Server Description:'}
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
                <p>Tip: Discord server descriptions have a 1,000 character limit. The generated description should be within this limit, but you may need to edit it if it's too long.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#5865F2] hover:text-[#4752C4] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate another description
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Server Description Checklist - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Server Description Checklist</h2>
            <p className="text-gray-600 mb-4">
              Use this checklist to ensure your server description is effective:
            </p>
            <ProChecklist type="server-description" />
            
            <div className="mt-8 bg-[#F0F9FF] border border-[#B9E6FE] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] mb-2">Why Your Server Description Matters</h3>
              <p className="text-sm text-gray-700 mb-3">
                Your Discord server description is often the first impression potential members have of your community. A well-crafted description can:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Clearly communicate your server's purpose and focus</li>
                <li>Set expectations for new members about the community vibe</li>
                <li>Highlight unique features and benefits of joining</li>
                <li>Attract members who are genuinely interested in your community</li>
                <li>Improve your server's discoverability in Discord's server discovery</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                Remember to keep your description concise (under 1,000 characters), engaging, and reflective of your server's personality.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}