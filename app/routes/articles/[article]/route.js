import { deleteArticle, editArticle } from "@/app/lib/services/articles";
import { revalidateTag } from "next/cache";

export async function PATCH(request, { params }) {
  const { article: articleId } = params;
  const article = await request.json();

  const data = await editArticle({ articleId, article });

  revalidateTag("articles");

  return new Response(JSON.stringify(data));
}

export async function DELETE({ params }) {
  const { article: articleId } = params;

  const data = await deleteArticle({ articleId });

  revalidateTag("articles");

  return new Response(JSON.stringify(data));
}
