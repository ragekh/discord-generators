import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { WebhookIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import ProTips from '../components/ProTips';
import ProChecklist from '../components/ProChecklist';

export default function WebhookGenerator() {
  const [service, setService] = useState('');
  const [purpose, setPurpose] = useState('');
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
      const response = await axios.post('http://localhost:5001/api/generate-webhook', { 
        service,
        purpose,
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
  const webhookSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Discord Webhook Generator',
    'url': 'https://discord-ai-generators.com/webhook',
    'description': 'Create webhook configurations for Discord integrations with our free AI generator. Enter your integration details to get a professional webhook setup instantly!',
    'applicationCategory': 'UtilityApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web'
  };

  // Predefined service suggestions
  const serviceSuggestions = [
    "GitHub",
    "GitLab",
    "Jira",
    "Trello",
    "Stripe",
    "PayPal",
    "Twitter",
    "YouTube",
    "Twitch",
    "Reddit",
    "RSS Feed",
    "Custom API"
  ];

  // Predefined purpose suggestions
  const purposeSuggestions = [
    "Notifications",
    "Monitoring",
    "Alerts",
    "Updates",
    "Automation",
    "Reporting",
    "Moderation",
    "Analytics"
  ];

  return (
    <>
      <SEO
        title="Discord Webhook Generator - Create Integration Configurations"
        description="Create webhook configurations for Discord integrations with our free AI generator. Enter your integration details to get a professional webhook setup instantly!"
        keywords="Discord webhooks, Discord integrations, webhook configuration, Discord API, webhook setup"
        schema={webhookSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#F6F6FE] rounded-full mb-4">
            <div className="text-[#5865F2]">
              <WebhookIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Discord Webhook Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create webhook configurations for Discord integrations. Whether you're connecting GitHub, Trello, or custom services, our generator will help you set up professional webhooks with detailed instructions.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Integration Service:</label>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              placeholder="Which service are you integrating with Discord? (e.g., GitHub, Trello, etc.)"
              required
            />
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {serviceSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setService(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Integration Purpose:</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              placeholder="What is the purpose of this integration? (e.g., commit notifications, issue tracking, etc.)"
              required
            />
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {purposeSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setPurpose(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
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
              'Generate Webhook Configuration'
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
          <ProTips category="webhook" />
        </div>
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2C2F33]">
                  {loading && regenerating ? 'Regenerating Webhook Configuration...' : 'Generated Webhook Configuration:'}
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
                <p>Tip: The configuration includes Discord markdown formatting. You can further customize it with emojis, mentions, and additional formatting before using it.</p>
                <p className="mt-2">Remember to keep your webhook URLs private and secure. Never share them publicly or commit them to public repositories.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#5865F2] hover:text-[#4752C4] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate another webhook configuration
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Webhook Tips - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Webhook Best Practices</h2>
            <p className="text-gray-600 mb-4">
              Use these tips to make your Discord webhooks more effective:
            </p>
            <ProChecklist type="webhook" />
            
            <div className="mt-8 bg-[#F0F9FF] border border-[#B9E6FE] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] mb-2">Why Webhooks Matter</h3>
              <p className="text-sm text-gray-700 mb-3">
                Well-configured webhooks are essential for creating seamless integrations with your Discord server. Effective webhooks:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Automate notifications from external services</li>
                <li>Keep your community updated with real-time information</li>
                <li>Reduce manual work for server administrators</li>
                <li>Create a more integrated and professional server experience</li>
                <li>Enable powerful workflows between Discord and other platforms</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                Consider using webhook avatars and names that clearly identify the source of the messages. You can also use embeds for more visually appealing and structured messages.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}