import Link from "next/link";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
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
      <EditAndDeleteButtons // Se muestran cuando el usuario está logueado
        articleId={id}
        nick={authors[0]}
        style={{
          position: "absolute",
          boxShadow: "0px 0px 20px 20px rgb(245, 245, 245)",
        }}
      />
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
