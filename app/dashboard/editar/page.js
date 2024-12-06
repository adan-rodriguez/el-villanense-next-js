import { getArticle } from "@/app/lib/services/articles";
import { notFound } from "next/navigation";
import EditArticleClientPage from "./page.client";

export default async function EditArticlePage(props) {
  const searchParams = await props.searchParams;
  const { articulo: articleId } = searchParams;

  if (!articleId) notFound();

  const article = await getArticle({ articleId });

  if (!article) notFound();

  return <EditArticleClientPage article={article} />;
}
