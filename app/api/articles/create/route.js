import { addArticle } from "@/app/lib/services/articles";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  const article = await request.json();
  //   if (!articleId) {
  const newArticle = await addArticle({ article });
  //   } else {
  //     editArticle({ articleId, article, image });
  //     alert("Artículo editado con éxito");
  //   }

  revalidatePath("/");
  revalidatePath("/dashboard/articulos");

  return new Response(JSON.stringify(newArticle));
}
