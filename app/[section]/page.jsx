// import Image from "next/image";
import Link from "next/link";
import { getSectionArticles } from "@/app/firebase/firebaseService";
import styles from "./Section.module.css";
import EditAndDeleteButtonsContainer from "../components/EditAndDeleteButtonsContainer";
import PageNotFound from "../components/PageNotFound";

export default async function Section({ params }) {
  const { section } = params;

  if (
    section !== "locales" &&
    section !== "regionales" &&
    section !== "provinciales" &&
    section !== "nacionales" &&
    section !== "internacionales"
  ) {
    return <PageNotFound />;
  }

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
    </>
  );
}
