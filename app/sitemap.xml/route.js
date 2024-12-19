import { getArticles } from "../lib/services/articles";

export async function GET() {
  const articles = await getArticles();

  const _48HoursAgo = Date.now() - 172800000; // 48 * 60 * 60 * 1000;

  let xml = "";
  articles.forEach(({ id, datetimeAttribute, title, timestamp }) => {
    if (timestamp >= _48HoursAgo) {
      xml += `<url>
                <loc>https://www.elvillanense.com.ar/${id}</loc>
                <news:news>
                  <news:publication>
                    <news:name>El Villanense</news:name>
                    <news:language>es</news:language>
                  </news:publication>
                  <news:publication_date>${datetimeAttribute}</news:publication_date>
                  <news:title>${title}</news:title>
                </news:news>
              </url>`;
      return;
    }

    xml += `<url>
              <loc>https://www.elvillanense.com.ar/${id}</loc>
            </url>`;
  });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
        ${xml}
      </urlset>`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}
