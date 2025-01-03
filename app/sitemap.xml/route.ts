// import { Article } from "../lib/types";
// import { API_URL } from "../lib/utils";

import { getArticles } from "../lib/services/articles";

export async function GET() {
  // const response = await fetch(`${API_URL}/articles`);
  // const articles: Article[] = await response.json();

  const articles = await getArticles();

  const _48HoursAgoTimestamp = Date.now() - 172800000; // 48 * 60 * 60 * 1000;

  let xml = "";
  articles.forEach(({ id, title, createdAt: { _seconds, _nanoseconds } }) => {
    const date = new Date(_seconds * 1000 + _nanoseconds / 1000000);

    const adjustedDate = new Date(date.getTime() - 3 * 60 * 60 * 1000);

    const publishedTime = adjustedDate.toISOString().slice(0, -8) + "-03:00";

    const publishedTimestamp =
      _seconds * 1000 + Math.floor(_nanoseconds / 1000000);

    if (publishedTimestamp >= _48HoursAgoTimestamp) {
      xml += `<url>
                <loc>https://www.elvillanense.com.ar/${id}</loc>
                <news:news>
                  <news:publication>
                    <news:name>El Villanense</news:name>
                    <news:language>es</news:language>
                  </news:publication>
                  <news:publication_date>${publishedTime}</news:publication_date>
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
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}
