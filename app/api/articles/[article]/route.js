import { editArticle } from "@/app/lib/services/articles";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  const { article: articleId } = params;
  const article = await request.json();

  const data = await editArticle({ articleId, article });

  revalidatePath("/");

  return new Response(JSON.stringify(data));
}
