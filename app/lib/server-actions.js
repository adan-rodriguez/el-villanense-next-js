"use server";

import { revalidateTag } from "next/cache";
import { addArticle, deleteArticle, editArticle } from "./services/articles";

export async function addAction({ article }) {
  await addArticle({ article });

  revalidateTag("articles");
}

export async function editAction({ articleId, article }) {
  await editArticle({ articleId, article });

  revalidateTag("articles");
}

export async function deleteAction({ articleId }) {
  await deleteArticle({ articleId });

  revalidateTag("articles");
}
