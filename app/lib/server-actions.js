"use server";

// import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";
import { addArticle, deleteArticle, editArticle } from "./services/articles";

export async function addAction({ article }) {
  const newArticle = await addArticle({ article });

  // revalidatePath("/");
  // !article.anonymous && revalidatePath(`/autor/${article.authors[0]}`);
  // revalidatePath("/dashboard/articulos");
  // revalidatePath("/sitemap.xml");

  revalidateTag("articles");
  return newArticle;
}

export async function editAction({ articleId, article }) {
  await editArticle({ articleId, article });

  // revalidatePath("/");
  // revalidatePath(`/autor/${article.authors[0]}`);
  // revalidatePath("/dashboard/articulos");
  // revalidatePath("/sitemap.xml");

  revalidateTag("articles");
}

export async function deleteAction({ articleId /*, nick*/ }) {
  await deleteArticle({ articleId });

  // revalidatePath("/");
  // revalidatePath(`/autor/${nick}`);
  // revalidatePath("/dashboard/articulos");
  // revalidatePath("/sitemap.xml");

  revalidateTag("articles");
}
