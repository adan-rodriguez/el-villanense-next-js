"use server";

import { revalidatePath } from "next/cache";
// import { revalidateTag } from "next/cache";
import { addArticle, deleteArticle, editArticle } from "./services/articles";
import { routes } from "./routes";

export async function addAction({ article }) {
  const newArticle = await addArticle({ article });

  revalidatePath(routes.root);
  !article.anonymous &&
    revalidatePath(routes.author.root + "/" + article.authors[0]);
  revalidatePath(routes.dashboard.articles.root);
  revalidatePath("/sitemap.xml");

  // revalidateTag("articles");
  return newArticle;
}

export async function editAction({ articleId, article }) {
  await editArticle({ articleId, article });

  revalidatePath(routes.root);
  revalidatePath(routes.author.root + "/" + article.authors[0]);
  revalidatePath(routes.dashboard.articles.root);
  revalidatePath("/sitemap.xml");

  // revalidateTag("articles");
}

export async function deleteAction({ articleId, nick }) {
  await deleteArticle({ articleId });

  revalidatePath(routes.root);
  revalidatePath(routes.author.root + "/" + nick);
  revalidatePath(routes.dashboard.articles.root);
  revalidatePath("/sitemap.xml");

  // revalidateTag("articles");
}
