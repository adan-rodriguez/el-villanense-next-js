// import { getArticles } from "@/app/lib/services/articles";
import { obtainArticles } from "@/app/lib/utils";
import ArticlesDashboardClientPage from "./page.client";

export default async function ArticlesDashboardPage() {
  // const articles = await getArticles();
  const articles = await obtainArticles();
  return <ArticlesDashboardClientPage articles={articles} />;
}
