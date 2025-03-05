import React from 'react';
import Head from 'next/head';

/**
 * Review Schema Component for SEO
 * Adds structured data for reviews to improve search results with rich snippets
 * 
 * @param {Object} props - Component props
 * @param {string} props.itemName - Name of the item being reviewed
 * @param {string} props.itemType - Type of the item (e.g., "Product", "SoftwareApplication")
 * @param {string} props.itemImage - URL of the image representing the item
 * @param {Array} props.reviews - Array of review objects with author, datePublished, reviewBody, and reviewRating properties
 * @param {Object} props.aggregateRating - Object with ratingValue, bestRating, worstRating, and reviewCount properties
 * @returns {JSX.Element} - Head component with JSON-LD script
 */
const ReviewSchema = ({ 
  itemName, 
  itemType = 'Product', 
  itemImage, 
  reviews = [],
  aggregateRating = null
}) => {
  if (!itemName || (!reviews.length && !aggregateRating)) return null;

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': itemType,
    'name': itemName,
    'image': itemImage
  };

  // Add individual reviews if provided
  if (reviews.length > 0) {
    reviewSchema.review = reviews.map(review => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': review.author
      },
      'datePublished': review.datePublished,
      'reviewBody': review.reviewBody,
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': review.reviewRating.ratingValue,
        'bestRating': review.reviewRating.bestRating || 5,
        'worstRating': review.reviewRating.worstRating || 1
      }
    }));
  }

  // Add aggregate rating if provided
  if (aggregateRating) {
    reviewSchema.aggregateRating = {
      '@type': 'AggregateRating',
      'ratingValue': aggregateRating.ratingValue,
      'bestRating': aggregateRating.bestRating || 5,
      'worstRating': aggregateRating.worstRating || 1,
      'reviewCount': aggregateRating.reviewCount
    };
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema)
        }}
      />
    </Head>
  );
};

export default ReviewSchema;