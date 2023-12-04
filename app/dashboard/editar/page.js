import { getArticle } from "@/app/lib/services/articles";
import DashboardEditArticle from "./DashboardEditArticle";
import { notFound } from "next/navigation";

export default async function EditArticlePage({ searchParams }) {
  const { articulo: articleId } = searchParams;

  const article = await getArticle({ articleId });

  if (!article) notFound();

  return <DashboardEditArticle articleId={articleId} article={article} />;
}
