import { addArticle, getArticles } from "@/app/lib/services/articles";
import { ArticleBasicData } from "@/app/lib/types";
import { revalidatePath } from "next/cache";

export async function GET() {
  const articles = await getArticles();

  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const article: ArticleBasicData = await request.json();

  const newArticle = await addArticle(article);

  revalidatePath("/");
  revalidatePath("/sitemap.xml");

  return new Response(JSON.stringify(newArticle), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
