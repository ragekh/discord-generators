export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://discord-ai-generators.com';
  
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/server-name', priority: '0.9', changefreq: 'monthly' },
    { url: '/server-description', priority: '0.9', changefreq: 'monthly' },
    { url: '/channel-name', priority: '0.9', changefreq: 'monthly' },
    { url: '/welcome-message', priority: '0.9', changefreq: 'monthly' },
    { url: '/bot-command', priority: '0.8', changefreq: 'monthly' },
    { url: '/role-name', priority: '0.8', changefreq: 'monthly' },
    { url: '/server-rules', priority: '0.8', changefreq: 'monthly' },
    { url: '/announcement', priority: '0.8', changefreq: 'monthly' }
  ];
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${pages
        .map(page => `
          <url>
            <loc>${baseUrl}${page.url}</loc>
            <lastmod>${currentDate}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
          </url>
        `)
        .join('')}
    </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=43200');
  res.write(sitemap);
  res.end();

  return { props: {} };
}