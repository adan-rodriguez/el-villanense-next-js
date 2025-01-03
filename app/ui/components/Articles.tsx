import { ArticleLink } from "./ArticleLink";
import styles from "../styles/Articles.module.css";
import { Article } from "@/app/lib/types";

type ArticleCard = Article & { publishedTime: string; readableTime: string };

export function Articles({ articles }: { articles: ArticleCard[] }) {
  if (articles.length === 0) return <p>No hay noticias por el momento</p>;

  return (
    <section className={styles.articles_links_container}>
      {articles.map((article) => (
        <ArticleLink key={article.id} article={article} />
      ))}
    </section>
  );
}
