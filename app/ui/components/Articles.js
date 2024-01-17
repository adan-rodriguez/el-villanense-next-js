import ArticleLink from "./ArticleLink";
import styles from "../styles/Articles.module.css";
import { getArticles } from "@/app/lib/services/articles";

export default async function Articles({ author }) {
  const articles = await getArticles({ author });

  if (articles.length === 0) return <p>No hay noticias por el momento</p>;

  return (
    <section className={styles.articles_links_container}>
      {articles.map(
        ({
          id,
          title,
          image,
          altImage,
          datetimeAttribute,
          dateContent,
          authors,
          anonymous,
        }) => (
          <ArticleLink
            key={id}
            id={id}
            title={title}
            image={image}
            altImage={altImage}
            datetimeAttribute={datetimeAttribute}
            dateContent={dateContent}
            authors={authors}
            anonymous={anonymous}
          />
        )
      )}
    </section>
  );
}
