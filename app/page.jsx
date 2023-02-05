// import Image from "next/image";
import styles from "./Home.module.css";
import getAllArticles from "@/app/firebase/firebaseService";
import Link from "next/link";

// export const revalidate = 600;

export default async function Home() {
  const articles = await getAllArticles();

  return (
    <div className={styles.articles_links_container}>
      {articles.map((article) => (
        <Link
          className={styles.article_link}
          key={article.id}
          href={`/${article.section}/${article.id}`}
        >
          <article>
            {/* <Image
              className={styles.article_link_img}
              src={article.image}
              alt={article.altImage}
              width={500}
              height={300}
              priority
            /> */}
            <img
              className={styles.article_link_img}
              src={article.image}
              alt={article.altImage}
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
  );
}
