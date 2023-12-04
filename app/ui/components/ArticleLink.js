import Link from "next/link";
import EditAndDeleteButtonsContainer from "./EditAndDeleteButtonsContainer";
import styles from "../styles/ArticleLink.module.css";
import Image from "next/image";
import { users } from "../../lib/users";

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
      <EditAndDeleteButtonsContainer articleId={id} />
      <Link className={styles.article_link} key={id} href={`/${id}`}>
        <img
          className={styles.article_link_img}
          src={image}
          alt={altImage}
          loading="lazy"
          // width={519}
          // height={346}
        />
        <time className={styles.article_link_time} dateTime={datetimeAttribute}>
          {dateContent}
        </time>
        <p className={styles.article_link_title}>{title}</p>
      </Link>
      {author && (
        <p className={styles.article_link_author_name}>
          Por{" "}
          <Link
            className={styles.article_link_author_name_link}
            href={`/autores/${users.find((user) => user.name === author).nick}`}
          >
            {author}
          </Link>
        </p>
      )}
    </article>
  );
}
