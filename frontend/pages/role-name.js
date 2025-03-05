import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { RoleNameIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import ProTips from '../components/ProTips';
import ProChecklist from '../components/ProChecklist';

export default function RoleNameGenerator() {
  const [serverTheme, setServerTheme] = useState('');
  const [roleType, setRoleType] = useState('');
  const [result, setResult] = useState('');
  const [previousResult, setPreviousResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [regenerating, setRegenerating] = useState(false);
  const resultRef = useRef(null);
  
  // Predefined server theme suggestions
  const serverThemeSuggestions = [
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
    "Education",
    "Science",
    "Photography",
    "Roleplay",
    "Community"
  ];
  
  // Function to add a server theme suggestion
  const addThemeSuggestion = (suggestion) => {
    setServerTheme(suggestion);
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
      const response = await axios.post('http://localhost:5001/api/generate-role-name', { 
        serverTheme,
        roleType,
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
  const roleNameSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Discord Role Name Generator',
    'url': 'https://discord-ai-generators.com/role-name',
    'description': 'Create thematic Discord role names with our free AI generator. Enter your server theme and role type to get role name ideas instantly!',
    'applicationCategory': 'UtilityApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web'
  };

  // Predefined role type options
  const roleTypeOptions = [
    "Moderators",
    "Administrators",
    "VIPs",
    "Boosters",
    "Regular Members",
    "New Members",
    "Special Events",
    "Content Creators",
    "Supporters/Donors",
    "Activity Levels",
    "Game Ranks",
    "Custom"
  ];

  return (
    <>
      <SEO
        title="Discord Role Name Generator - Thematic Role Ideas"
        description="Create thematic Discord role names with our free AI generator. Enter your server theme and role type to get role name ideas instantly!"
        keywords="Discord role names, server roles, Discord hierarchy, role color ideas, Discord permissions, custom roles"
        schema={roleNameSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#F6F6FE] dark:bg-[#2F3136] rounded-full mb-4">
            <div className="text-[#5865F2]">
              <RoleNameIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Discord Role Name Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create thematic role names that fit your Discord server's style. Generate creative role names with suggested colors to build an organized and visually appealing hierarchy.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#36393F] p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 mb-6">
          <div className="mb-4">
            <label className="block mb-2 font-semibold dark:text-gray-200">Server Theme:</label>
            <input
              type="text"
              value={serverTheme}
              onChange={(e) => setServerTheme(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-[#2F3136] dark:text-gray-200 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              placeholder="e.g., Gaming, Art, Tech Support, Anime, Music"
              required
            />
            
            {/* Server Theme Suggestions */}
            <div className="mt-2">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Popular server themes (click to use):</p>
              <div className="flex flex-wrap gap-2">
                {serverThemeSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => addThemeSuggestion(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-1 px-2 rounded transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold dark:text-gray-200">Role Type:</label>
            <select
              value={roleType}
              onChange={(e) => setRoleType(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-[#2F3136] dark:text-gray-200 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
              required
            >
              <option value="" disabled>Select a role type</option>
              {roleTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {roleType === "Custom" && (
              <input
                type="text"
                value={roleType === "Custom" ? "" : roleType}
                onChange={(e) => setRoleType(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-600 dark:bg-[#2F3136] dark:text-gray-200 rounded-md focus:ring-2 focus:ring-[#5865F2] focus:border-[#5865F2] outline-none transition"
                placeholder="Enter custom role type"
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
              'Generate Role Names'
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
          <ProTips category="role-name" />
        </div>
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white dark:bg-[#36393F] p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2C2F33] dark:text-gray-200">
                  {loading && regenerating ? 'Regenerating Role Names...' : 'Generated Role Names:'}
                </h2>
                {!loading && <CopyButton text={result} />}
              </div>
              <div className="bg-gray-50 dark:bg-[#2F3136] p-4 rounded-md border border-gray-200 dark:border-gray-700 relative">
                {loading && regenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-[#36393F] bg-opacity-70 z-10">
                    <LoadingSpinner size="lg" color="#5865F2" />
                  </div>
                )}
                <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{loading && regenerating ? previousResult : result}</pre>
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>Tip: Each role name includes a suggested color hex code. You can use these codes when creating roles in your Discord server settings.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#5865F2] hover:text-[#4752C4] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate more role names
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Role Name Tips - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Role Hierarchy Best Practices</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Use these tips to create an effective role system:
            </p>
            <ProChecklist type="role-name" />
            
            <div className="mt-8 bg-[#F0F9FF] dark:bg-[#2F3136] border border-[#B9E6FE] dark:border-[#4752C4] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] dark:text-[#5865F2] mb-2">Why Role Names Matter</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Well-designed roles enhance your Discord server's organization and member experience. Good role systems:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>Create a clear hierarchy that members can understand at a glance</li>
                <li>Use colors effectively to distinguish between different role types</li>
                <li>Reflect your server's theme and personality</li>
                <li>Provide recognition and status to active members</li>
                <li>Make permission management easier with logical groupings</li>
              </ul>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                Remember that Discord displays roles in order from bottom to top in the role settings, with higher roles having more permissions. Plan your hierarchy accordingly, and consider using role separators (blank roles with a colored line as the name) to organize your roles visually.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}