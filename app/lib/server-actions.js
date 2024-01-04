"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { addArticle, deleteArticle, editArticle } from "./services/articles";

export async function addAction({ article }) {
  await addArticle({ article });

  revalidateTag("articles");
  revalidatePath("/sitemap.xml");
}

export async function editAction({ articleId, article }) {
  await editArticle({ articleId, article });

  revalidateTag("articles");
  revalidatePath("/sitemap.xml");
}

export async function deleteAction({ articleId }) {
  await deleteArticle({ articleId });

  revalidateTag("articles");
  revalidatePath("/sitemap.xml");
}
