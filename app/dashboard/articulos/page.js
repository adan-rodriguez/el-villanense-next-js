import { getArticles } from "@/app/lib/services/articles";
import ArticlesDashboard from "../../ui/components/ArticlesDashboard";

export default async function ArticlesDashboardPage() {
  const articles = await getArticles();
  return <ArticlesDashboard articles={articles} />;
}
