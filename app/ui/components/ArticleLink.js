import Link from "next/link";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import styles from "../styles/ArticleLink.module.css";
import ArticleLinkAuthor from "./ArticleLinkAuthor";

export default function ArticleLink({
  id,
  image,
  altImage,
  title,
  datetimeAttribute,
  dateContent,
  authors,
}) {
  return (
    <article className={styles.article}>
      <EditAndDeleteButtons articleId={id} />
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
      {!authors?.anonymous &&
        authors?.names.map((name, index) => (
          <ArticleLinkAuthor key={index} name={name} />
        ))}
    </article>
  );
}
