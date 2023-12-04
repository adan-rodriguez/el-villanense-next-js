import Link from "next/link";
import EditAndDeleteButtonsContainer from "./EditAndDeleteButtonsContainer";
import styles from "../styles/ArticleLink.module.css";
import ArticleLinkAuthor from "./ArticleLinkAuthor";

export default function ArticleLink({
  id,
  image,
  altImage,
  title,
  datetimeAttribute,
  dateContent,
  author,
}) {
  return (
    <article className={styles.article}>
      <EditAndDeleteButtonsContainer
        articleId={id}
        positionAbsolute={{ position: "absolute" }}
      />
      <Link className={styles.article_link} key={id} href={`/${id}`}>
        <img
          className={styles.article_link_img}
          src={image}
          alt={altImage}
          loading="lazy"
        />
        <time className={styles.article_link_time} dateTime={datetimeAttribute}>
          {dateContent}
        </time>
        <p className={styles.article_link_title}>{title}</p>
      </Link>
      {author && <ArticleLinkAuthor author={author} />}
    </article>
  );
}
