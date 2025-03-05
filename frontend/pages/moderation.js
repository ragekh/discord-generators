import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ModerationIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import ProTips from '../components/ProTips';
import ProChecklist from '../components/ProChecklist';

export default function ModerationResponseGenerator() {
  const [violationType, setViolationType] = useState('');
  const [severity, setSeverity] = useState('');
  const [context, setContext] = useState('');
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
      const response = await axios.post('http://localhost:5001/api/generate-moderation', { 
        violationType,
        severity,
        context,
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
  const moderationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Discord Moderation Response Generator',
    'url': 'https://discord-ai-generators.com/moderation',
    'description': 'Create professional templates for moderator responses to rule violations with our free AI generator. Enter the violation type and severity to get a well-crafted response instantly!',
    'applicationCategory': 'UtilityApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web'
  };

  // Predefined violation type options
  const violationTypeOptions = [
    "Spam",
    "Harassment",
    "Hate Speech",
    "NSFW Content",
    "Advertising",
    "Off-topic Posting",
    "Trolling",
    "Impersonation",
    "Doxxing",
    "Raiding",
    "Ban Evasion",
    "Self-harm Content",
    "Misinformation",
    "Other"
  ];

  // Predefined severity options
  const severityOptions = [
    "Minor",
    "Moderate",
    "Serious",
    "Severe",
    "Critical"
  ];

  return (
    <>
      <SEO
        title="Discord Moderation Response Generator - Professional Templates"
        description="Create professional templates for moderator responses to rule violations with our free AI generator. Enter the violation type and severity to get a well-crafted response instantly!"
        keywords="Discord moderation, server rules, rule violations, moderator responses, Discord moderation templates"
        schema={moderationSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#F6F6FE] rounded-full mb-4">
            <div className="text-[#5865F2]">
              <ModerationIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Discord Moderation Response Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create professional templates for moderator responses to rule violations. Our generator helps you craft clear, fair, and consistent messages that explain violations and consequences.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Violation Type:</label>
            <select
              value={violationType}
              onChange={(e) => setViolationType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              required
            >
              <option value="" disabled>Select a violation type</option>
              {violationTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {violationType === "Other" && (
              <input
                type="text"
                value={violationType === "Other" ? "" : violationType}
                onChange={(e) => setViolationType(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
                placeholder="Enter custom violation type"
                required
              />
            )}
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Severity Level:</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              required
            >
              <option value="" disabled>Select a severity level</option>
              {severityOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Additional Context (Optional):</label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              rows="3"
              placeholder="Provide any additional context about the violation that might be relevant (e.g., repeat offense, specific circumstances, etc.)"
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
              'Generate Moderation Response'
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
          <ProTips category="moderation" />
        </div>
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2C2F33]">
                  {loading && regenerating ? 'Regenerating Response...' : 'Generated Moderation Response:'}
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
                <p>Tip: This is a template that you can customize for specific situations. You may want to adjust the tone or details based on your server's culture and the specific circumstances.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#5865F2] hover:text-[#4752C4] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate another response
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Moderation Tips - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Moderation Best Practices</h2>
            <p className="text-gray-600 mb-4">
              Use these tips to make your moderation more effective:
            </p>
            <ProChecklist type="moderation" />
            
            <div className="mt-8 bg-[#F0F9FF] border border-[#B9E6FE] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] mb-2">Why Consistent Moderation Matters</h3>
              <p className="text-sm text-gray-700 mb-3">
                Professional and consistent moderation is essential for maintaining a healthy Discord community. Effective moderation:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Creates a safe and welcoming environment for all members</li>
                <li>Establishes clear expectations for behavior</li>
                <li>Reduces drama and conflict within the community</li>
                <li>Builds trust between members and the moderation team</li>
                <li>Helps members understand why rules exist and why they matter</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                Consider creating a private channel for your moderation team to discuss approaches and share templates. This helps ensure consistency across different moderators and situations.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}