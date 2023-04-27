import Link from "next/link";
import EditAndDeleteButtonsContainer from "./EditAndDeleteButtonsContainer";
import { users } from "../utils/constants/users";
import styles from "./ArticleLink.module.css";

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
    <Link className={styles.article_link} key={id} href={`/${section}/${id}`}>
      <article>
        {/* <Image
              className={styles.article_link_img}
              src={image}
              alt={altImage}
              width={500}
              height={300}
              priority
            /> */}
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
      </article>
    </Link>
  );
}
