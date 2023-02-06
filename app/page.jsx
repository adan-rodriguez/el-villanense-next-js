// import Image from "next/image";
import styles from "./Home.module.css";
import { getAllArticles } from "@/app/firebase/firebaseService";
import Link from "next/link";
import EditAndDeleteButtonsContainer from "./components/EditAndDeleteButtonsContainer";

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
            <EditAndDeleteButtonsContainer
              articleId={article.id}
              section={article.section}
              style={{
                position: "absolute",
                display: "flex",
                columnGap: "10px",
                margin: "5px",
                backgroundColor: "white",
              }}
            />
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
