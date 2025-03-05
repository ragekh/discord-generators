import Link from 'next/link';
import {
  ServerNameIcon,
  ServerDescriptionIcon,
  ChannelNameIcon,
  WelcomeMessageIcon,
  BotCommandIcon,
  RoleNameIcon,
  ServerRulesIcon,
  AnnouncementIcon,
  EmojiIcon,
  EventIcon,
  PollIcon,
  WebhookIcon,
  ModerationIcon,
  DiscordLogo
} from '../components/Icons';
import SEO from '../components/SEO';
import FAQSchema from '../components/FAQSchema';
import FAQ from '../components/FAQ';
import LocalBusinessSchema from '../components/LocalBusinessSchema';
import HowToSchema from '../components/HowToSchema';
import ProTips from '../components/ProTips';

export default function Home() {
  // FAQ data for the FAQ schema
  const faqs = [
    {
      question: "What are Discord AI Generators?",
      answer: "Discord AI Generators are free AI-powered tools designed to help Discord server owners optimize their servers. Our tools can generate server names, server descriptions, channel names, welcome messages, bot commands, role names, server rules, announcements, custom emoji ideas, event descriptions, engaging polls, webhook configurations for integrations, and moderation response templates for rule violations."
    },
    {
      question: "Are these tools really free?",
      answer: "Yes, all our AI generators are completely free to use. There are no hidden fees or premium tiers."
    },
    {
      question: "How do I use these generators?",
      answer: "Simply select the generator you need, fill in the required information, and click the generate button. The AI will create optimized content for your Discord server in seconds."
    },
    {
      question: "Can I edit the generated content?",
      answer: "Absolutely! The AI provides a starting point, but you should always review and personalize the content to match your server's voice and specific needs."
    },
    {
      question: "Will using these tools improve my Discord server?",
      answer: "While we can't guarantee specific results, our tools are designed to help create engaging, clear, and professional content for your Discord server. Many server owners report improved member engagement and retention after implementing AI-generated content."
    }
  ];
  
  // How-to data for the HowTo schema
  const howToSteps = [
    {
      name: "Choose a Generator",
      text: "Select the appropriate generator for your needs from our homepage.",
      image: "https://discord-ai-generators.com/images/step1.jpg",
      url: "https://discord-ai-generators.com/#generators"
    },
    {
      name: "Enter Your Information",
      text: "Fill in the required fields with details about your server or specific needs.",
      image: "https://discord-ai-generators.com/images/step2.jpg",
      url: "https://discord-ai-generators.com/#input"
    },
    {
      name: "Generate Content",
      text: "Click the generate button and wait a few seconds for the AI to create your content.",
      image: "https://discord-ai-generators.com/images/step3.jpg",
      url: "https://discord-ai-generators.com/#generate"
    },
    {
      name: "Review and Use",
      text: "Review the generated content, make any necessary edits, and copy it to your Discord server.",
      image: "https://discord-ai-generators.com/images/step4.jpg",
      url: "https://discord-ai-generators.com/#review"
    }
  ];
  
  return (
    <>
      <SEO
        title="Discord AI Generators - Boost Your Discord Server with AI Tools"
        description="Generate Discord server names, descriptions, channel names, and more with our free AI tools. Optimize your Discord server for success!"
        keywords="Discord AI tools, Discord server name generator, Discord server description, Discord channel names, Discord server optimization"
        ogImage="https://discord-ai-generators.com/og-image.jpg"
        ogImageAlt="Discord AI Generators - Free tools for Discord server owners"
      />
      
      {/* Additional schema markup for rich results */}
      <FAQSchema faqs={faqs} />
      
      <LocalBusinessSchema
        images={[]} // Removed references to non-existent images
      />
      
      <HowToSchema
        name="How to Use Discord AI Generators"
        description="Learn how to use our free AI tools to optimize your Discord server"
        image="" // Removed reference to non-existent image
        steps={howToSteps.map(step => ({
          ...step,
          image: "" // Removed references to non-existent images
        }))}
        totalTime="PT5M"
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Discord AI Generators</h1>
        <p className="text-lg mb-10 text-center max-w-2xl mx-auto px-4">
          Boost your Discord server with our free AI-powered tools. Create unique server names, compelling descriptions, organized channel names, engaging welcome messages, exciting event descriptions, interactive polls, powerful webhook integrations, and professional moderation responses in seconds!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <Link href="/server-name" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <ServerNameIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Server Name Generator</h2>
            <p className="text-gray-600 text-sm">Create a unique and memorable name for your Discord server</p>
          </Link>
          
          <Link href="/server-description" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <ServerDescriptionIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Server Description Generator</h2>
            <p className="text-gray-600 text-sm">Write compelling server descriptions that attract new members</p>
          </Link>
          
          <Link href="/channel-name" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <ChannelNameIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Channel Name Generator</h2>
            <p className="text-gray-600 text-sm">Create organized and thematic channel names</p>
          </Link>
          
          <Link href="/welcome-message" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <WelcomeMessageIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Welcome Message Generator</h2>
            <p className="text-gray-600 text-sm">Create engaging welcome messages for new members</p>
          </Link>

          <Link href="/bot-command" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <BotCommandIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Bot Command Generator</h2>
            <p className="text-gray-600 text-sm">Generate custom bot commands and responses</p>
          </Link>
          
          <Link href="/role-name" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <RoleNameIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Role Name Generator</h2>
            <p className="text-gray-600 text-sm">Create thematic role names that fit your server</p>
          </Link>
          
          <Link href="/server-rules" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <ServerRulesIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Server Rules Generator</h2>
            <p className="text-gray-600 text-sm">Generate clear and comprehensive server rules</p>
          </Link>
          
          <Link href="/announcement" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <AnnouncementIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Announcement Generator</h2>
            <p className="text-gray-600 text-sm">Create engaging announcements for your server</p>
          </Link>
          
          <Link href="/emoji" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <EmojiIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Emoji Generator</h2>
            <p className="text-gray-600 text-sm">Create custom emoji ideas for your server</p>
          </Link>
          
          <Link href="/event" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <EventIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Event Generator</h2>
            <p className="text-gray-600 text-sm">Create event descriptions and schedules for Discord events</p>
          </Link>
          
          <Link href="/poll" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <PollIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Poll Generator</h2>
            <p className="text-gray-600 text-sm">Create engaging polls for Discord servers</p>
          </Link>
          
          <Link href="/webhook" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <WebhookIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Webhook Generator</h2>
            <p className="text-gray-600 text-sm">Create webhook configurations for Discord integrations</p>
          </Link>
          
          <Link href="/moderation" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#5865F2] mb-3">
              <ModerationIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Moderation Response Generator</h2>
            <p className="text-gray-600 text-sm">Create templates for moderator responses to rule violations</p>
          </Link>
        </div>
        
        <div className="mt-12 bg-[#F6F6FE] p-6 rounded-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Why Use Our AI Tools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4">
              <h3 className="font-semibold text-[#5865F2] mb-2">Save Time</h3>
              <p className="text-sm">Generate professional content in seconds instead of spending hours writing</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[#5865F2] mb-2">Increase Engagement</h3>
              <p className="text-sm">Create clear, engaging content that helps members interact more with your server</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[#5865F2] mb-2">Stand Out</h3>
              <p className="text-sm">Make your server more professional and appealing compared to others</p>
            </div>
          </div>
        </div>
        
        {/* Discord Statistics Section */}
        <div className="mt-12 bg-white border border-gray-200 p-6 rounded-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Discord Server Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#5865F2] mb-2">70%</div>
              <p className="text-sm text-gray-600">of users prefer servers with clear organization</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#5865F2] mb-2">58%</div>
              <p className="text-sm text-gray-600">higher retention with welcoming onboarding</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#5865F2] mb-2">3.2x</div>
              <p className="text-sm text-gray-600">more engagement in well-structured servers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#5865F2] mb-2">45%</div>
              <p className="text-sm text-gray-600">of users check server rules before engaging</p>
            </div>
          </div>
          
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              <strong>Effective server organization is crucial for Discord success.</strong> With millions of servers competing for attention, standing out requires strategic optimization. Discord's algorithm and user behavior favor servers with clear organization, engaging content, and active communities.
            </p>
            <p className="mb-3">
              Servers that have clear channel structures, welcoming messages, well-defined roles, and consistent rules see significantly higher member retention and engagement. Our AI generators help you implement these best practices effortlessly, giving your server a professional edge.
            </p>
            <p>
              Whether you're just starting your Discord community or looking to revitalize an established server, our tools provide the optimization you need to create a more engaging and successful community.
            </p>
          </div>
        </div>
        {/* Discord Tips Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">Discord Server Tips</h2>
          <p className="text-center text-gray-600 mb-6">Implement these strategies to improve your server's engagement</p>
          
          {/* Import and use the ProTips component */}
          <ProTips category="general" />
        </div>
        
        {/* FAQ Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <FAQ faqs={faqs} />
        </div>
      </div>
    </>
  );
}