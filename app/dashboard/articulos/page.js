import { getArticlesAndCache } from "@/app/lib/utils";
import ArticlesDashboardClientPage from "./page.client";

export default async function ArticlesDashboardPage() {
  const articles = await getArticlesAndCache({});
  return <ArticlesDashboardClientPage articles={articles} />;
}
