import React from 'react';
import Head from 'next/head';

/**
 * LocalBusiness Schema Component for SEO
 * Adds structured data for local business to improve search results with rich snippets
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the business
 * @param {string} props.description - Description of the business
 * @param {string} props.url - URL of the business website
 * @param {string} props.telephone - Telephone number of the business
 * @param {string} props.email - Email address of the business
 * @param {Object} props.address - Address object with streetAddress, addressLocality, addressRegion, postalCode, and addressCountry properties
 * @param {Array} props.openingHours - Array of opening hours objects with dayOfWeek, opens, and closes properties
 * @param {Array} props.images - Array of image URLs
 * @returns {JSX.Element} - Head component with JSON-LD script
 */
const LocalBusinessSchema = ({ 
  name = 'Discord AI Generators',
  description = 'Free AI tools to help Discord server owners optimize their servers',
  url = 'https://discord-ai-generators.com',
  telephone = '',
  email = 'contact@discord-ai-generators.com',
  address = null,
  openingHours = [],
  images = []
}) => {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': name,
    'description': description,
    'url': url,
    'applicationCategory': 'UtilityApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  // Add email if provided
  if (email) {
    businessSchema.email = email;
  }

  // Add telephone if provided
  if (telephone) {
    businessSchema.telephone = telephone;
  }

  // Add address if provided
  if (address) {
    businessSchema.address = {
      '@type': 'PostalAddress',
      'streetAddress': address.streetAddress,
      'addressLocality': address.addressLocality,
      'addressRegion': address.addressRegion,
      'postalCode': address.postalCode,
      'addressCountry': address.addressCountry
    };
  }

  // Add opening hours if provided
  if (openingHours && openingHours.length > 0) {
    businessSchema.openingHoursSpecification = openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': hours.dayOfWeek,
      'opens': hours.opens,
      'closes': hours.closes
    }));
  }

  // Add images if provided
  if (images && images.length > 0) {
    businessSchema.image = images;
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessSchema)
        }}
      />
    </Head>
  );
};

export default LocalBusinessSchema;