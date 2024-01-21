import { unstable_cache } from "next/cache";
import ArticlesDashboardClientPage from "./page.client";
import { getArticles } from "@/app/lib/services/articles";

const obtainArticles = unstable_cache(
  async () => await getArticles(),
  ["articles-dashboard"],
  {
    tags: ["articles"],
  }
);

export default async function ArticlesDashboardPage() {
  const articles = await obtainArticles();

  return <ArticlesDashboardClientPage articles={articles} />;
}
