import Image from "next/image";
import Link from "next/link";
import { getSectionArticles } from "@/app/firebase/firebaseService";
import styles from "./Section.module.css";

// export const revalidate = 600;

export default async function Section({ params }) {
  const { section } = params;

  const articles = await getSectionArticles(section);

  return (
    <>
      <h1
        className={styles.section_page_title}
      >{`Noticias ${section[0].toUpperCase()}${section.slice(1)}`}</h1>
      <div className={styles.articles_links_container}>
        {articles.map((article) => (
          <Link
            className={styles.article_link}
            key={article.id}
            href={`/${article.section}/${article.id}`}
          >
            <article>
              <Image
                className={styles.article_link_img}
                src={article.image}
                alt={article.altImage}
                width={500}
                height={300}
                priority
              />
              <time
                className={styles.article_link_time}
                dateTime={article.datetimeAttribute}
              >
                {article.dateContent}
              </time>
              <p className={styles.article_link_title}>{article.title}</p>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
