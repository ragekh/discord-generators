import React from 'react';
import Head from 'next/head';

/**
 * HowTo Schema Component for SEO
 * Adds structured data for how-to guides to improve search results with rich snippets
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the how-to guide
 * @param {string} props.description - Description of the how-to guide
 * @param {string} props.image - URL of the image representing the how-to guide
 * @param {Array} props.steps - Array of step objects with name, text, image, and url properties
 * @param {string} props.totalTime - ISO 8601 duration format (e.g., "PT30M" for 30 minutes)
 * @param {Array} props.tools - Array of tool objects with name and image properties
 * @param {Array} props.supplies - Array of supply objects with name and image properties
 * @returns {JSX.Element} - Head component with JSON-LD script
 */
const HowToSchema = ({ 
  name, 
  description, 
  image, 
  steps, 
  totalTime,
  tools = [],
  supplies = []
}) => {
  if (!name || !steps || steps.length === 0) return null;

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': name,
    'description': description,
    'image': image,
    'totalTime': totalTime,
    'step': steps.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.name,
      'text': step.text,
      'image': step.image,
      'url': step.url
    }))
  };

  // Add tools if provided
  if (tools.length > 0) {
    howToSchema.tool = tools.map(tool => ({
      '@type': 'HowToTool',
      'name': tool.name,
      'image': tool.image
    }));
  }

  // Add supplies if provided
  if (supplies.length > 0) {
    howToSchema.supply = supplies.map(supply => ({
      '@type': 'HowToSupply',
      'name': supply.name,
      'image': supply.image
    }));
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema)
        }}
      />
    </Head>
  );
};

export default HowToSchema;