"use server";

import { revalidatePath } from "next/cache";
// import { revalidateTag } from "next/cache";
import { addArticle, deleteArticle, editArticle } from "./services/articles";
import { routes } from "./routes";

export async function addAction({ article }) {
  await addArticle({ article });

  revalidatePath(routes.root);
  revalidatePath(routes.dashboard.articles.root);
  revalidatePath("/sitemap.xml");

  // revalidateTag("articles");
}

export async function editAction({ articleId, article }) {
  await editArticle({ articleId, article });

  revalidatePath(routes.root);
  revalidatePath(routes.dashboard.articles.root);
  revalidatePath("/sitemap.xml");

  // revalidateTag("articles");
}

export async function deleteAction({ articleId }) {
  await deleteArticle({ articleId });

  revalidatePath(routes.root);
  revalidatePath(routes.dashboard.articles.root);
  revalidatePath("/sitemap.xml");

  // revalidateTag("articles");
}
