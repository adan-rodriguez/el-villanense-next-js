import { getArticlesAndCache } from "@/app/lib/utils";
import ArticlesDashboard from "@/app/ui/components/ArticlesDashboard";

export default async function ArticlesDashboardPage() {
  const articles = await getArticlesAndCache();
  return <ArticlesDashboard articles={articles} />;
}
