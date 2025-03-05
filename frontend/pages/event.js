import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { EventIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import ProTips from '../components/ProTips';
import ProChecklist from '../components/ProChecklist';

export default function EventGenerator() {
  const [eventType, setEventType] = useState('');
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
      const response = await axios.post('http://localhost:5001/api/generate-event', { 
        eventType,
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
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Discord Event Generator',
    'url': 'https://discord-ai-generators.com/event',
    'description': 'Create engaging Discord event descriptions and schedules with our free AI generator. Enter your event details to get a professional event description instantly!',
    'applicationCategory': 'UtilityApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web'
  };

  // Predefined event type options
  const eventTypeOptions = [
    "Gaming Tournament",
    "Community Meetup",
    "Watch Party",
    "Q&A Session",
    "Workshop",
    "Giveaway",
    "Art Contest",
    "Music Event",
    "Charity Stream",
    "Movie Night",
    "Game Night",
    "Custom"
  ];

  return (
    <>
      <SEO
        title="Discord Event Generator - Create Engaging Event Descriptions"
        description="Create engaging Discord event descriptions and schedules with our free AI generator. Enter your event details to get a professional event description instantly!"
        keywords="Discord events, server events, Discord event description, community events, Discord event schedule"
        schema={eventSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#F6F6FE] rounded-full mb-4">
            <div className="text-[#5865F2]">
              <EventIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Discord Event Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create engaging event descriptions and schedules for your Discord server. Whether you're planning tournaments, meetups, or watch parties, our generator will help you craft detailed and exciting event announcements.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Event Type:</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              required
            >
              <option value="" disabled>Select an event type</option>
              {eventTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {eventType === "Custom" && (
              <input
                type="text"
                value={eventType === "Custom" ? "" : eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
                placeholder="Enter custom event type"
                required
              />
            )}
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Event Details:</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              rows="4"
              placeholder="Provide specific details about your event. Include any relevant dates, times, requirements, prizes, or other information that should be included in the description."
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
              'Generate Event Description'
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
          <ProTips category="event" />
        </div>
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2C2F33]">
                  {loading && regenerating ? 'Regenerating Event Description...' : 'Generated Event Description:'}
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
                <p>Tip: The event description includes Discord markdown formatting. You can further customize it with emojis, mentions, and additional formatting before posting.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#5865F2] hover:text-[#4752C4] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate another event description
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Event Tips - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Event Best Practices</h2>
            <p className="text-gray-600 mb-4">
              Use these tips to make your Discord events more successful:
            </p>
            <ProChecklist type="event" />
            
            <div className="mt-8 bg-[#F0F9FF] border border-[#B9E6FE] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] mb-2">Why Events Matter</h3>
              <p className="text-sm text-gray-700 mb-3">
                Well-organized events are essential for building an active Discord community. Effective events:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Increase member engagement and participation</li>
                <li>Create memorable experiences that keep members coming back</li>
                <li>Help build relationships between community members</li>
                <li>Showcase your server's unique culture and interests</li>
                <li>Provide structure and regular activities for your community</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                Consider using Discord's built-in event scheduler feature, which allows members to RSVP and receive notifications. You can also create dedicated event channels or categories to organize event-related discussions and information.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}