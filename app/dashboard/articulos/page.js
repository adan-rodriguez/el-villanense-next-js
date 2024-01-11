import { getArticles } from "@/app/lib/services/articles";
import ArticlesDashboardClientPage from "./page.client";

export default async function ArticlesDashboardPage() {
  const articles = await getArticles();
  return <ArticlesDashboardClientPage articles={articles} />;
}
