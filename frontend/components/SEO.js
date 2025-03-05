import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * Enhanced SEO component for consistent metadata across pages
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogImageAlt - Open Graph image alt text
 * @param {string} props.ogType - Open Graph type
 * @param {Object} props.schema - JSON-LD schema object
 * @param {Array} props.alternateLanguages - Array of alternate language URLs
 * @param {string} props.publishedTime - Article published time (ISO format)
 * @param {string} props.modifiedTime - Article modified time (ISO format)
 * @param {Array} props.articleTags - Article tags for news/blog content
 * @returns {JSX.Element} - SEO component with metadata
 */
const SEO = ({
  title = 'Discord AI Generators',
  description = 'Generate Discord server names, descriptions, channel names, and more with our free AI tools.',
  keywords = 'Discord AI tools, Discord server name generator, Discord server description, Discord channel names',
  ogImage = 'https://discord-ai-generators.com/og-image.jpg',
  ogImageAlt = 'Discord AI Generators - AI tools for Discord server owners',
  ogType = 'website',
  schema = null,
  alternateLanguages = [],
  publishedTime = '',
  modifiedTime = '',
  articleTags = [],
}) => {
  const router = useRouter();
  const canonicalUrl = `https://discord-ai-generators.com${router.asPath}`;
  const pageTitle = `${title} | Discord AI Generators`;
  
  // Generate breadcrumbs schema
  const generateBreadcrumbsSchema = () => {
    const path = router.asPath;
    const breadcrumbs = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://discord-ai-generators.com/'
      }
    ];
    
    if (path !== '/') {
      const pathSegments = path.split('/').filter(Boolean);
      let currentPath = '';
      
      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        breadcrumbs.push({
          '@type': 'ListItem',
          'position': index + 2,
          'name': segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
          'item': `https://discord-ai-generators.com${currentPath}`
        });
      });
    }
    
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs
    };
  };
  
  // Generate organization schema
  const generateOrganizationSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Discord AI Generators',
      'url': 'https://discord-ai-generators.com',
      'logo': 'https://discord-ai-generators.com/logo.png',
      'sameAs': [
        'https://twitter.com/discordaigenerators',
        'https://facebook.com/discordaigenerators',
        'https://instagram.com/discordaigenerators'
      ]
    };
  };
  
  // Generate website schema
  const generateWebsiteSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'url': 'https://discord-ai-generators.com',
      'name': 'Discord AI Generators',
      'description': 'Free AI tools to help Discord server owners optimize their servers',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://discord-ai-generators.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    };
  };
  
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate languages */}
      {alternateLanguages.map((lang) => (
        <link
          key={lang.hrefLang}
          rel="alternate"
          hrefLang={lang.hrefLang}
          href={lang.href}
        />
      ))}
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Discord AI Generators" />
      
      {/* Article specific Open Graph tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && articleTags.length > 0 &&
        articleTags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))
      }
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      <meta name="twitter:site" content="@discordaigenerators" />
      
      {/* Structured Data - Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbsSchema())
        }}
      />
      
      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema())
        }}
      />
      
      {/* Structured Data - Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebsiteSchema())
        }}
      />
      
      {/* Custom schema if provided */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      )}
    </Head>
  );
};

export default SEO;