import React, { useState } from 'react';

/**
 * Pro Checklist Component
 * Provides an interactive checklist of best practices for Discord servers
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Type of checklist to display (e.g., 'server-name', 'server-description', 'channel-name')
 * @returns {JSX.Element} - Pro Checklist component
 */
const ProChecklist = ({ type = 'general' }) => {
  // Checklists organized by type
  const checklistsByType = {
    general: [
      { id: 'g1', text: 'Set up clear channel categories and organization' },
      { id: 'g2', text: 'Configure proper role permissions and hierarchy' },
      { id: 'g3', text: 'Add useful bots for moderation and engagement' },
      { id: 'g4', text: 'Create a dedicated welcome channel for new members' },
      { id: 'g5', text: 'Set up server rules and verification system' }
    ],
    'server-name': [
      { id: 'sn1', text: 'Keep it short and memorable' },
      { id: 'sn2', text: 'Ensure it\'s easy to spell and pronounce' },
      { id: 'sn3', text: 'Check availability on social media platforms' },
      { id: 'sn4', text: 'Avoid trademark infringement' },
      { id: 'sn5', text: 'Make it relevant to your community focus' }
    ],
    'server-description': [
      { id: 'sd1', text: 'Clearly state your server\'s purpose and focus' },
      { id: 'sd2', text: 'Highlight unique features or community aspects' },
      { id: 'sd3', text: 'Keep it under 1,000 characters (Discord limit)' },
      { id: 'sd4', text: 'Use emojis to make it visually appealing' },
      { id: 'sd5', text: 'Include keywords for server discovery' }
    ],
    'channel-name': [
      { id: 'cn1', text: 'Use consistent naming conventions' },
      { id: 'cn2', text: 'Add relevant emojis as prefixes' },
      { id: 'cn3', text: 'Group similar channels under categories' },
      { id: 'cn4', text: 'Keep names short and descriptive' },
      { id: 'cn5', text: 'Use hyphens instead of spaces (Discord standard)' }
    ],
    'welcome-message': [
      { id: 'wm1', text: 'Greet new members warmly' },
      { id: 'wm2', text: 'Direct to important channels (rules, introductions)' },
      { id: 'wm3', text: 'Explain how to get roles or access more channels' },
      { id: 'wm4', text: 'Use Discord markdown for formatting' },
      { id: 'wm5', text: 'Encourage members to introduce themselves' }
    ],
    'bot-command': [
      { id: 'bc1', text: 'Use intuitive command names and prefixes' },
      { id: 'bc2', text: 'Include help documentation for each command' },
      { id: 'bc3', text: 'Set appropriate permission levels' },
      { id: 'bc4', text: 'Test commands in a private channel first' },
      { id: 'bc5', text: 'Consider using Discord\'s slash command system' }
    ],
    'role-name': [
      { id: 'rn1', text: 'Create a clear hierarchy with role names' },
      { id: 'rn2', text: 'Use distinct colors for different role types' },
      { id: 'rn3', text: 'Keep names concise for better display' },
      { id: 'rn4', text: 'Match role names to your server theme' },
      { id: 'rn5', text: 'Consider using emojis or symbols for visual distinction' }
    ],
    'server-rules': [
      { id: 'sr1', text: 'Number rules for easy reference' },
      { id: 'sr2', text: 'Be specific about prohibited behaviors' },
      { id: 'sr3', text: 'Clearly state consequences for rule violations' },
      { id: 'sr4', text: 'Include Discord Terms of Service compliance' },
      { id: 'sr5', text: 'Make rules easy to understand and follow' }
    ],
    announcement: [
      { id: 'a1', text: 'Use clear, attention-grabbing titles' },
      { id: 'a2', text: 'Include all relevant details (dates, times, requirements)' },
      { id: 'a3', text: 'Use formatting for readability (headers, bold, etc.)' },
      { id: 'a4', text: 'Only use @everyone/@here for important announcements' },
      { id: 'a5', text: 'Pin critical announcements for future reference' }
    ]
  };
  
  // Get checklist for the current type, fallback to general checklist if type not found
  const checklist = checklistsByType[type] || checklistsByType.general;
  
  // State to track checked items
  const [checkedItems, setCheckedItems] = useState({});
  
  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Calculate progress
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = checklist.length > 0 ? Math.round((checkedCount / checklist.length) * 100) : 0;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 my-4">
      <h3 className="font-semibold text-gray-800 mb-3">Pro Checklist</h3>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-[#5865F2] h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">
        {progress}% complete ({checkedCount}/{checklist.length})
      </p>
      
      {/* Checklist items */}
      <ul className="space-y-2">
        {checklist.map((item) => (
          <li key={item.id} className="flex items-start">
            <input
              type="checkbox"
              id={item.id}
              checked={!!checkedItems[item.id]}
              onChange={() => handleCheckboxChange(item.id)}
              className="mt-1 h-4 w-4 text-[#5865F2] rounded border-gray-300 focus:ring-[#5865F2]"
            />
            <label htmlFor={item.id} className="ml-2 text-sm text-gray-700 cursor-pointer">
              {item.text}
            </label>
          </li>
        ))}
      </ul>
      
      {progress === 100 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-700 font-medium">
            Great job! You've completed all the best practices for this section.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProChecklist;