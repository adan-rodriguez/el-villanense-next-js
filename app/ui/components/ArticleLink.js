import Link from "next/link";
import styles from "../styles/ArticleLink.module.css";
import ArticleAuthorLink from "./ArticleAuthorLink";

export default function ArticleLink({
  id,
  image,
  altImage,
  title,
  datetimeAttribute,
  dateContent,
  authors,
  anonymous,
}) {
  return (
    <article className={styles.article}>
      <Link className={styles.link} key={id} href={`/${id}`}>
        <figure className={styles.figure}>
          <img
            className={styles.image}
            src={image}
            alt={altImage}
            loading="lazy"
          />
        </figure>
        <time className={styles.time} dateTime={datetimeAttribute}>
          {dateContent}
        </time>
        <p className={styles.title}>{title}</p>
      </Link>
      {!anonymous &&
        authors.map((nick) => <ArticleAuthorLink key={nick} nick={nick} />)}
    </article>
  );
}
