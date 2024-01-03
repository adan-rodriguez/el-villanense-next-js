"use server";

import { revalidateTag } from "next/cache";
import { deleteArticle } from "./services/articles";

export async function deleteAction({ articleId }) {
  await deleteArticle({ articleId });

  revalidateTag("articles");
}
