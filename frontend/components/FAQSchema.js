import React from 'react';
import Head from 'next/head';

/**
 * FAQ Schema Component for SEO
 * Adds structured data for FAQs to improve search results with rich snippets
 * 
 * @param {Object} props - Component props
 * @param {Array} props.faqs - Array of FAQ objects with question and answer properties
 * @returns {JSX.Element} - Head component with JSON-LD script
 */
const FAQSchema = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
    </Head>
  );
};

export default FAQSchema;