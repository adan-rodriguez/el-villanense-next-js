import Link from "next/link";
import EditAndDeleteButtonsContainer from "./EditAndDeleteButtonsContainer";
import { users } from "../utils/constants/users";
import styles from "../styles/ArticleLink.module.css";

export default function ArticleLink({
  id,
  image,
  altImage,
  title,
  datetimeAttribute,
  dateContent,
  author,
  section,
}) {
  return (
    <article className={styles.article}>
      <EditAndDeleteButtonsContainer
        articleId={id}
        section={section}
        style={{
          position: "absolute",
          display: "flex",
          columnGap: "10px",
          margin: "5px",
          backgroundColor: "white",
        }}
      />
      <Link key={id} href={`/${section}/${id}`}>
        {/* <Image
              className={styles.article_link_img}
              src={image}
              alt={altImage}
              width={500}
              height={300}
              priority
            /> */}
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
        {author && (
          <p style={{ fontSize: "11px", opacity: "0.7" }}>
            Por <strong>{users[author]?.name}</strong>
          </p>
        )}
      </Link>
    </article>
  );
}
