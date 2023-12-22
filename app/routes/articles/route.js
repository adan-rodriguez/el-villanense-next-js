import { addArticle } from "@/app/lib/services/articles";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  const article = await request.json();

  const newArticle = await addArticle({ article });

  revalidatePath("/");

  return new Response(JSON.stringify(newArticle));
}
