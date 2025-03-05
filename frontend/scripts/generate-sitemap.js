/**
 * Enhanced Sitemap Generator Script
 *
 * This script generates multiple sitemap files for the Discord AI Generators website:
 * 1. Main sitemap.xml - includes all pages with metadata
 * 2. Image sitemap - includes images used across the site
 * 3. Sitemap index - references all sitemaps
 *
 * Run with: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const baseUrl = 'https://discord-ai-generators.com';
const outputDir = path.join(__dirname, '../public');
const currentDate = new Date().toISOString();
const formattedDate = currentDate.split('T')[0]; // YYYY-MM-DD

// Define all pages with their metadata
const pages = [
  {
    url: '/',
    priority: '1.0',
    changefreq: 'weekly',
    images: [
      {
        url: '/images/home-hero.jpg',
        title: 'Discord AI Generators - AI tools for Discord server owners',
        caption: 'Free AI tools to optimize your Discord server',
        geoLocation: 'USA',
        license: 'https://creativecommons.org/licenses/by/4.0/'
      }
    ]
  },
  {
    url: '/server-name',
    priority: '0.9',
    changefreq: 'monthly',
    images: [
      {
        url: '/images/server-name-example.jpg',
        title: 'Discord Server Name Generator Example',
        caption: 'Generate unique and memorable names for your Discord server'
      }
    ]
  },
  {
    url: '/server-description',
    priority: '0.9',
    changefreq: 'monthly',
    images: [
      {
        url: '/images/server-description-example.jpg',
        title: 'Discord Server Description Generator Example',
        caption: 'Create compelling server descriptions that attract new members'
      }
    ]
  },
  {
    url: '/channel-name',
    priority: '0.9',
    changefreq: 'monthly',
    images: [
      {
        url: '/images/channel-name-example.jpg',
        title: 'Discord Channel Name Generator Example',
        caption: 'Generate organized and thematic channel names'
      }
    ]
  },
  {
    url: '/welcome-message',
    priority: '0.9',
    changefreq: 'monthly',
    images: [
      {
        url: '/images/welcome-message-example.jpg',
        title: 'Discord Welcome Message Generator Example',
        caption: 'Create engaging welcome messages for new members'
      }
    ]
  },
  {
    url: '/bot-command',
    priority: '0.8',
    changefreq: 'monthly',
    images: [
      {
        url: '/images/bot-command-example.jpg',
        title: 'Discord Bot Command Generator Example',
        caption: 'Generate custom bot commands and responses'
      }
    ]
  },
  {
    url: '/role-name',
    priority: '0.8',
    changefreq: 'monthly',
    images: [
      {
        url: '/images/role-name-example.jpg',
        title: 'Discord Role Name Generator Example',
        caption: 'Create thematic role names that fit your server'
      }
    ]
  },
  {
    url: '/server-rules',
    priority: '0.8',
    changefreq: 'monthly',
    images: [
      {
        url: '/images/server-rules-example.jpg',
        title: 'Discord Server Rules Generator Example',
        caption: 'Generate clear and comprehensive server rules'
      }
    ]
  },
  {
    url: '/announcement',
    priority: '0.8',
    changefreq: 'monthly',
    images: [
      {
        url: '/images/announcement-example.jpg',
        title: 'Discord Announcement Generator Example',
        caption: 'Create engaging announcements for your server'
      }
    ]
  }
];

// Generate main sitemap XML
const generateMainSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
              http://www.google.com/schemas/sitemap-image/1.1
              http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
${pages
  .map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${page.images.map(image => `    <image:image>
      <image:loc>${baseUrl}${image.url}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
      ${image.geoLocation ? `<image:geo_location>${image.geoLocation}</image:geo_location>` : ''}
      ${image.license ? `<image:license>${image.license}</image:license>` : ''}
    </image:image>`).join('\n')}
  </url>`)
  .join('\n')}
</urlset>`;

  return sitemap;
};

// Generate image sitemap XML
const generateImageSitemap = () => {
  // Collect all images from all pages
  const allImages = pages.reduce((acc, page) => {
    page.images.forEach(image => {
      acc.push({
        pageUrl: `${baseUrl}${page.url}`,
        ...image
      });
    });
    return acc;
  }, []);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allImages
  .map(image => `  <url>
    <loc>${image.pageUrl}</loc>
    <image:image>
      <image:loc>${baseUrl}${image.url}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
      ${image.geoLocation ? `<image:geo_location>${image.geoLocation}</image:geo_location>` : ''}
      ${image.license ? `<image:license>${image.license}</image:license>` : ''}
    </image:image>
  </url>`)
  .join('\n')}
</urlset>`;

  return sitemap;
};

// Generate sitemap index XML
const generateSitemapIndex = () => {
  const sitemaps = [
    { name: 'sitemap.xml', lastmod: currentDate },
    { name: 'sitemap-images.xml', lastmod: currentDate }
  ];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(sitemap => `  <sitemap>
    <loc>${baseUrl}/${sitemap.name}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`)
  .join('\n')}
</sitemapindex>`;

  return sitemapIndex;
};

// Write sitemap to file
const writeSitemap = (sitemap, filename) => {
  const outputPath = path.join(outputDir, filename);
  try {
    fs.writeFileSync(outputPath, sitemap);
    console.log(`Sitemap generated successfully at: ${outputPath}`);
  } catch (error) {
    console.error(`Error writing sitemap ${filename}:`, error);
  }
};

// Create robots.txt with sitemap reference
const createRobotsTxt = () => {
  const robotsTxt = `# Discord AI Generators robots.txt
# https://discord-ai-generators.com

User-agent: *
Allow: /

# Disallow crawling of error pages
Disallow: /404
Disallow: /500
Disallow: /_next/

# Sitemaps
Sitemap: https://discord-ai-generators.com/sitemap-index.xml

# Crawl delay to be nice to search engines
Crawl-delay: 1

# Google-specific directives
User-agent: Googlebot
Allow: /
Disallow: /404
Disallow: /500
Disallow: /_next/

# Bing-specific directives
User-agent: Bingbot
Allow: /
Disallow: /404
Disallow: /500
Disallow: /_next/

# Yahoo-specific directives
User-agent: Slurp
Allow: /
Disallow: /404
Disallow: /500
Disallow: /_next/

# Yandex-specific directives
User-agent: Yandex
Allow: /
Disallow: /404
Disallow: /500
Disallow: /_next/

# Baidu-specific directives
User-agent: Baiduspider
Allow: /
Disallow: /404
Disallow: /500
Disallow: /_next/
`;

  const robotsPath = path.join(outputDir, 'robots.txt');
  try {
    fs.writeFileSync(robotsPath, robotsTxt);
    console.log(`robots.txt generated successfully at: ${robotsPath}`);
  } catch (error) {
    console.error('Error writing robots.txt:', error);
  }
};

// Execute
const mainSitemap = generateMainSitemap();
const imageSitemap = generateImageSitemap();
const sitemapIndex = generateSitemapIndex();

writeSitemap(mainSitemap, 'sitemap.xml');
writeSitemap(imageSitemap, 'sitemap-images.xml');
writeSitemap(sitemapIndex, 'sitemap-index.xml');
createRobotsTxt();

console.log('All sitemap files generated successfully!');