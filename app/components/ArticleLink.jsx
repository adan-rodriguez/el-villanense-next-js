import Link from "next/link";
import EditAndDeleteButtonsContainer from "./EditAndDeleteButtonsContainer";
import { users } from "../utils/constants/users";
import styles from "../styles/ArticleLink.module.css";
import Image from "next/image";

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
        <Image
          className={styles.article_link_img}
          src={image}
          alt={altImage}
          width={519}
          height={346}
        />
        <time className={styles.article_link_time} dateTime={datetimeAttribute}>
          {dateContent}
        </time>
        <p className={styles.article_link_title}>{title}</p>
        {author && (
          <p className={styles.article_link_author_name}>
            Por <strong>{users[author]?.name}</strong>
          </p>
        )}
      </Link>
    </article>
  );
}
