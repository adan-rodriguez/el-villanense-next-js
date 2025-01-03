import { addArticle, getArticles } from "@/app/lib/services/articles";

export async function GET() {
  const articles = await getArticles();

  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const article = await request.json();

  const newArticle = await addArticle(article);

  return new Response(JSON.stringify(newArticle), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
