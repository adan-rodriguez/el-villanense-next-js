import ArticleLink from "./ArticleLink";
import styles from "../styles/Articles.module.css";
import { getArticlesAndCache } from "@/app/lib/utils";

export default async function Articles({ author }) {
  const articles = await getArticlesAndCache({ author });

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
