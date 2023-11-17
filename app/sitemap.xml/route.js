import { getAllArticles } from "../services/articles";

export async function GET() {
  const headers = new Headers();
  headers.set("Content-Type", "application/xml");

  const articles = await getAllArticles();
  let xml = "";
  articles.forEach(
    ({ datetimeAttribute, id }) =>
      (xml += `<url>
                <loc>https://www.elvillanense.com.ar/${id}</loc>
                <lastmod>${datetimeAttribute}</lastmod>
              </url>`)
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
              <loc>https://www.elvillanense.com.ar/</loc>
              <lastmod>${articles[0].datetimeAttribute}</lastmod>
            </url>
            ${xml}
        </urlset>
    `,
    {
      headers,
    }
  );
}
