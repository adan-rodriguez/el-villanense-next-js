import { getArticlesByAuthor } from "@/app/lib/services/articles";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ author: string }> }
) {
  const { author } = await params;
  const articles = await getArticlesByAuthor(author);

  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
