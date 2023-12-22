import { routes } from "@/app/lib/routes";
import { deleteArticle, editArticle } from "@/app/lib/services/articles";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  const { article: articleId } = params;
  const article = await request.json();

  const data = await editArticle({ articleId, article });

  revalidatePath(routes.root);

  return new Response(JSON.stringify(data));
}

export async function DELETE({ params }) {
  const { article: articleId } = params;

  const data = await deleteArticle({ articleId });

  revalidatePath(routes.root);

  return new Response(JSON.stringify(data));
}
