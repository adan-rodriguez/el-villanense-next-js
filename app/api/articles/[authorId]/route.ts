import { getArticlesByAuthorId } from "@/app/lib/services/articles";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ authorId: string }> }
) {
  const { authorId } = await params;

  const articles = await getArticlesByAuthorId(authorId);

  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
