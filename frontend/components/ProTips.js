import React, { useState, useEffect } from 'react';

/**
 * Dynamic Pro Tips Component
 * Displays rotating tips relevant to Discord server owners
 * 
 * @param {Object} props - Component props
 * @param {string} props.category - Category of tips to display (e.g., 'server-name', 'server-description', 'channel-name')
 * @param {boolean} props.autoRotate - Whether to automatically rotate tips
 * @param {number} props.interval - Interval in milliseconds for auto-rotation
 * @returns {JSX.Element} - Pro Tips component
 */
const ProTips = ({ category = 'general', autoRotate = true, interval = 10000 }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  // Tips organized by category
  const tipsByCategory = {
    general: [
      {
        title: "Use Clear Channel Organization",
        content: "Organize channels into categories based on topics or functions to make navigation intuitive for members."
      },
      {
        title: "Set Up Proper Permissions",
        content: "Discord's permission system is powerful. Take time to configure roles and permissions to prevent spam and abuse."
      },
      {
        title: "Utilize Server Boosts",
        content: "Encourage members to boost your server to unlock perks like higher audio quality and more emoji slots."
      },
      {
        title: "Mobile Optimization",
        content: "Over 70% of Discord users access servers via mobile. Ensure your server is easy to navigate on small screens."
      },
      {
        title: "Analyze Successful Servers",
        content: "Study popular servers in your niche to understand effective organization and engagement strategies."
      }
    ],
    'server-name': [
      {
        title: "Keep It Memorable",
        content: "Choose a name that's easy to spell, pronounce, and remember for better word-of-mouth growth."
      },
      {
        title: "Reflect Your Community",
        content: "Your server name should give potential members an immediate idea of what your community is about."
      },
      {
        title: "Check Availability",
        content: "Ensure your server name is available across social media platforms for consistent branding."
      },
      {
        title: "Avoid Trademark Issues",
        content: "Research to make sure your chosen name doesn't infringe on existing trademarks or popular communities."
      },
      {
        title: "Future-Proof Your Name",
        content: "Choose a name that allows for growth and expansion of your community focus."
      }
    ],
    'server-description': [
      {
        title: "Be Concise and Clear",
        content: "Your server description should quickly communicate your server's purpose and what makes it special."
      },
      {
        title: "Highlight Key Features",
        content: "Mention unique bots, events, or community aspects that set your server apart from others."
      },
      {
        title: "Use Emojis Strategically",
        content: "Emojis can make your description more visually appealing and highlight important points."
      },
      {
        title: "Include Community Focus",
        content: "Clearly state what kind of community you're building and who it's for."
      },
      {
        title: "Add Discovery Keywords",
        content: "If your server is public, include relevant keywords to help it appear in Discord's server discovery."
      }
    ],
    'channel-name': [
      {
        title: "Use Consistent Naming",
        content: "Adopt a consistent naming convention for similar channels (e.g., game-minecraft, game-valorant)."
      },
      {
        title: "Add Channel Emojis",
        content: "Prefix channel names with relevant emojis to make them visually distinct and easier to scan."
      },
      {
        title: "Keep Names Short",
        content: "Short, descriptive channel names are easier to read and navigate, especially on mobile."
      },
      {
        title: "Use Hyphens Not Spaces",
        content: "Discord automatically converts spaces to hyphens, so use hyphens directly for consistency."
      },
      {
        title: "Create Clear Categories",
        content: "Group related channels under well-named categories to maintain an organized server structure."
      }
    ],
    'welcome-message': [
      {
        title: "Be Warm and Friendly",
        content: "First impressions matter. Make new members feel welcome with a friendly, positive tone."
      },
      {
        title: "Highlight Key Channels",
        content: "Direct new members to important channels like rules, introductions, and community hubs."
      },
      {
        title: "Explain Next Steps",
        content: "Clearly outline what new members should do first (e.g., read rules, select roles, introduce themselves)."
      },
      {
        title: "Use Rich Formatting",
        content: "Utilize Discord's markdown for bold, italics, and headings to make your welcome message readable."
      },
      {
        title: "Include Server Culture",
        content: "Briefly mention your community's values and culture to set expectations from the start."
      }
    ],
    'bot-command': [
      {
        title: "Use Intuitive Prefixes",
        content: "Choose command prefixes that are easy to remember and type (e.g., !, /, .)."
      },
      {
        title: "Create Command Categories",
        content: "Organize commands by function (moderation, fun, utility) to make them easier to learn and use."
      },
      {
        title: "Document Commands",
        content: "Create a dedicated commands channel or guide that explains all available commands and their usage."
      },
      {
        title: "Consider Slash Commands",
        content: "Discord's slash command system offers better discoverability and user experience than prefix commands."
      },
      {
        title: "Test Thoroughly",
        content: "Test all commands in a private channel before making them available to ensure they work as expected."
      }
    ],
    'role-name': [
      {
        title: "Create a Clear Hierarchy",
        content: "Role names should clearly indicate their position in your server's hierarchy."
      },
      {
        title: "Use Color Coding",
        content: "Assign distinct colors to different role types to make them visually distinguishable in the member list."
      },
      {
        title: "Keep Names Concise",
        content: "Short role names display better in chat and the member list."
      },
      {
        title: "Match Server Theme",
        content: "Align role names with your server's theme or topic for a cohesive community feel."
      },
      {
        title: "Consider Special Characters",
        content: "Unicode symbols or emojis can make role names stand out, but use them sparingly."
      }
    ],
    'server-rules': [
      {
        title: "Be Clear and Specific",
        content: "Avoid vague rules like 'be respectful' - explain what behaviors are and aren't acceptable."
      },
      {
        title: "Explain Consequences",
        content: "Clearly state what happens when rules are broken (warnings, timeouts, bans)."
      },
      {
        title: "Number Your Rules",
        content: "Numbered rules are easier to reference when moderating ('You've violated rule #3')."
      },
      {
        title: "Cover Discord TOS",
        content: "Remind members that Discord's Terms of Service and Community Guidelines must be followed."
      },
      {
        title: "Keep Rules Updated",
        content: "Regularly review and update your rules as your community grows and evolves."
      }
    ],
    announcement: [
      {
        title: "Use @mentions Wisely",
        content: "Only use @everyone or @here for truly important announcements to avoid notification fatigue."
      },
      {
        title: "Format for Readability",
        content: "Use headers, bold text, and emojis to make announcements scannable and visually appealing."
      },
      {
        title: "Include All Details",
        content: "For events, include date, time (with timezone), requirements, and any other relevant information."
      },
      {
        title: "Pin Important Announcements",
        content: "Pin crucial announcements so members can easily find them later."
      },
      {
        title: "Use Embeds for Polish",
        content: "For major announcements, consider using bot-generated embeds for a more professional look."
      }
    ],
    emoji: [
      {
        title: "Follow Discord Naming Conventions",
        content: "Discord emoji names must be lowercase with no spaces. Use underscores instead (e.g., happy_face, cool_cat)."
      },
      {
        title: "Optimize for Small Size",
        content: "Emojis display at 32x32 pixels in chat. Ensure your designs are clear and recognizable at this small size."
      },
      {
        title: "Create Themed Sets",
        content: "Develop emoji sets that match your server's theme for a cohesive visual identity."
      },
      {
        title: "Balance Reaction Types",
        content: "Include a mix of reaction emojis (expressing emotions) and server-specific emotes (representing inside jokes or themes)."
      },
      {
        title: "Consider Animated Emojis",
        content: "For boosted servers, animated emojis can add extra visual interest. Keep animations simple and looping smoothly."
      }
    ],
    event: [
      {
        title: "Use Discord's Event Scheduler",
        content: "Take advantage of Discord's built-in event scheduler feature, which allows members to RSVP and receive notifications."
      },
      {
        title: "Include Clear Time Information",
        content: "Always specify the date, time, and timezone for your events to avoid confusion for international members."
      },
      {
        title: "Create Event Graphics",
        content: "Eye-catching graphics or banners can increase visibility and excitement for your upcoming events."
      },
      {
        title: "Send Reminders",
        content: "Schedule reminders 24 hours and 1 hour before events to maximize attendance and participation."
      },
      {
        title: "Plan Interactive Elements",
        content: "Include interactive elements like polls, Q&A sessions, or breakout rooms to keep participants engaged during events."
      }
    ],
    poll: [
      {
        title: "Keep Questions Clear and Specific",
        content: "Avoid ambiguous or double-barreled questions. Each poll should focus on a single, clearly defined topic."
      },
      {
        title: "Provide Balanced Options",
        content: "Ensure your poll options cover the full range of possible answers without bias toward any particular outcome."
      },
      {
        title: "Use Reaction Emojis",
        content: "Discord's reaction feature is perfect for polls. Use distinct emojis that clearly represent each option."
      },
      {
        title: "Set a Voting Deadline",
        content: "Specify when voting will close to create a sense of urgency and ensure timely participation."
      },
      {
        title: "Share Poll Results",
        content: "After the poll closes, share the results and any actions that will be taken based on the feedback."
      }
    ],
    webhook: [
      {
        title: "Use Descriptive Names and Avatars",
        content: "Give your webhook a name and avatar that clearly identifies its source and purpose to your server members."
      },
      {
        title: "Secure Your Webhook URLs",
        content: "Treat webhook URLs like passwords. Never share them publicly or commit them to public repositories."
      },
      {
        title: "Use Embeds for Structure",
        content: "Webhook embeds allow for more visually appealing and structured messages than plain text."
      },
      {
        title: "Filter Relevant Events",
        content: "Configure your webhook to only send notifications for relevant events to prevent channel spam."
      },
      {
        title: "Create Dedicated Channels",
        content: "Create specific channels for different webhook integrations to keep notifications organized."
      }
    ],
    moderation: [
      {
        title: "Be Clear and Specific",
        content: "Clearly state which rule was violated and how, avoiding vague language that could lead to confusion."
      },
      {
        title: "Maintain Professionalism",
        content: "Keep a professional tone even when dealing with frustrating situations. Avoid sarcasm or condescension."
      },
      {
        title: "Document Moderation Actions",
        content: "Keep records of all moderation actions in a private channel for consistency and accountability."
      },
      {
        title: "Explain the 'Why'",
        content: "Explain why rules exist and how violations impact the community to help members understand the purpose."
      },
      {
        title: "Provide Appeal Information",
        content: "For serious actions like bans, always provide information on how to appeal if your server allows appeals."
      }
    ]
  };
  
  // Get tips for the current category, fallback to general tips if category not found
  const tips = tipsByCategory[category] || tipsByCategory.general;
  
  // Auto-rotate tips if enabled
  useEffect(() => {
    if (!autoRotate) return;
    
    const rotationTimer = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, interval);
    
    return () => clearInterval(rotationTimer);
  }, [autoRotate, interval, tips.length]);
  
  // Get current tip
  const currentTip = tips[currentTipIndex];
  
  // Handle manual navigation
  const goToPreviousTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length);
  };
  
  const goToNextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };
  
  return (
    <div className="bg-[#F6F6FE] border border-[#DBDCFF] rounded-lg p-4 my-4">
      <div className="flex items-start">
        <div className="text-[#5865F2] mr-3 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[#5865F2] text-sm mb-1">PRO TIP: {currentTip.title}</h3>
          <p className="text-sm text-gray-700">{currentTip.content}</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-3">
        <div className="text-xs text-gray-500">
          Tip {currentTipIndex + 1} of {tips.length}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={goToPreviousTip}
            className="text-[#5865F2] hover:text-[#4752C4] transition"
            aria-label="Previous tip"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={goToNextTip}
            className="text-[#5865F2] hover:text-[#4752C4] transition"
            aria-label="Next tip"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProTips;