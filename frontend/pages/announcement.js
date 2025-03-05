import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { AnnouncementIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import ProTips from '../components/ProTips';
import ProChecklist from '../components/ProChecklist';

export default function AnnouncementGenerator() {
  const [announcementType, setAnnouncementType] = useState('');
  const [details, setDetails] = useState('');
  const [result, setResult] = useState('');
  const [previousResult, setPreviousResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [regenerating, setRegenerating] = useState(false);
  const resultRef = useRef(null);
  
  // Predefined announcement details suggestions
  const detailsSuggestions = [
    "New server features including voice channels and custom roles",
    "Community game night this Friday at 8 PM EST, everyone welcome",
    "Server reached 1,000 members milestone, special events planned",
    "Updated rules regarding content sharing and moderation",
    "New partnership with related Discord community for cross-events",
    "Introducing new moderators to help manage our growing community",
    "Scheduled maintenance on Saturday from 2-4 PM UTC",
    "Weekly art contest with prizes for top three submissions",
    "Holiday special events throughout December with daily activities",
    "Server redesign with new channels and category organization"
  ];
  
  // Function to add a details suggestion
  const addDetailsSuggestion = (suggestion) => {
    setDetails(suggestion);
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
      const response = await axios.post('http://localhost:5001/api/generate-announcement', { 
        announcementType,
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
  const announcementSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Discord Announcement Generator',
    'url': 'https://discord-ai-generators.com/announcement',
    'description': 'Create engaging Discord server announcements with our free AI generator. Enter your announcement details to get a professional announcement instantly!',
    'applicationCategory': 'UtilityApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web'
  };

  // Predefined announcement type options
  const announcementTypeOptions = [
    "Server Update",
    "New Feature",
    "Event Announcement",
    "Community Milestone",
    "Rule Change",
    "Partnership Announcement",
    "Staff Change",
    "Maintenance Notice",
    "Contest/Giveaway",
    "Server Relaunch",
    "Holiday Greeting",
    "Custom"
  ];

  return (
    <>
      <SEO
        title="Discord Announcement Generator - Engaging Server Updates"
        description="Create engaging Discord server announcements with our free AI generator. Enter your announcement details to get a professional announcement instantly!"
        keywords="Discord announcements, server updates, Discord event announcement, community announcements, Discord markdown"
        schema={announcementSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#F6F6FE] rounded-full mb-4">
            <div className="text-[#5865F2]">
              <AnnouncementIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Discord Announcement Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create engaging announcements for your Discord server. Whether you're announcing events, updates, or important changes, our generator will help you craft clear and attention-grabbing messages.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Announcement Type:</label>
            <select
              value={announcementType}
              onChange={(e) => setAnnouncementType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              required
            >
              <option value="" disabled>Select an announcement type</option>
              {announcementTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {announcementType === "Custom" && (
              <input
                type="text"
                value={announcementType === "Custom" ? "" : announcementType}
                onChange={(e) => setAnnouncementType(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
                placeholder="Enter custom announcement type"
                required
              />
            )}
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Announcement Details:</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              rows="4"
              placeholder="Provide specific details about your announcement. Include any relevant dates, times, requirements, or other information that should be included."
              required
            />
            
            {/* Announcement Details Suggestions */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Example announcements (click to use):</p>
              <div className="flex flex-wrap gap-2">
                {detailsSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => addDetailsSuggestion(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded transition"
                  >
                    {suggestion.length > 40 ? suggestion.substring(0, 40) + '...' : suggestion}
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
              'Generate Announcement'
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
          <ProTips category="announcement" />
        </div>
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2C2F33]">
                  {loading && regenerating ? 'Regenerating Announcement...' : 'Generated Announcement:'}
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
                <p>Tip: The announcement includes Discord markdown formatting. You can further customize it with emojis, mentions, and additional formatting before posting.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#5865F2] hover:text-[#4752C4] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate another announcement
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Announcement Tips - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Announcement Best Practices</h2>
            <p className="text-gray-600 mb-4">
              Use these tips to make your announcements more effective:
            </p>
            <ProChecklist type="announcement" />
            
            <div className="mt-8 bg-[#F0F9FF] border border-[#B9E6FE] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] mb-2">Why Announcements Matter</h3>
              <p className="text-sm text-gray-700 mb-3">
                Well-crafted announcements are essential for keeping your Discord community informed and engaged. Effective announcements:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Capture attention with clear formatting and engaging language</li>
                <li>Provide all necessary information in an organized way</li>
                <li>Generate excitement and participation for events and updates</li>
                <li>Keep your community informed about important changes</li>
                <li>Maintain transparency and build trust with your members</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                Consider creating a dedicated #announcements channel and setting up permissions so only staff can post there. You can also use Discord's announcement channel feature, which allows members to follow the channel and receive notifications in their own servers.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}