import { addArticle } from "@/app/lib/services/articles";
import { revalidateTag } from "next/cache";

export async function POST(request) {
  const article = await request.json();

  const newArticle = await addArticle({ article });

  revalidateTag("articles");

  return new Response(JSON.stringify(newArticle));
}
