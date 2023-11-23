import DashboardEditArticle from "./DashboardEditArticle";

export default function EditArticlePage({ searchParams }) {
  const { articulo: articleId } = searchParams;

  return <DashboardEditArticle articleId={articleId} />;
}
