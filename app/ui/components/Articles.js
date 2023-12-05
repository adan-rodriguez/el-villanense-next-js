import ArticleLink from "./ArticleLink";
import styles from "../styles/Articles.module.css";
import { getArticles } from "@/app/lib/services/articles";
import { unstable_cache } from "next/cache";

const getCachedArticles = unstable_cache(
  async ({ author }) => await getArticles({ author }),
  ["articles-home"],
  {
    tags: ["articles"],
  }
);

export default async function Articles({ author }) {
  const articles = await getCachedArticles({ author });

  if (articles.length === 0) return <p>No hay noticias por el momento</p>;

  return (
    <div className={styles.articles_links_container}>
      {articles.map((article) => (
        <ArticleLink
          key={article.id}
          id={article.id}
          title={article.title}
          image={article.image}
          altImage={article.altImage}
          datetimeAttribute={article.datetimeAttribute}
          dateContent={article.dateContent}
          author={article.author}
        />
      ))}
    </div>
  );
}
