import Link from "next/link";
import styles from "../styles/ArticleLink.module.css";
import { ArticleAuthorLink } from "./ArticleAuthorLink";
import { Article } from "@/app/lib/types";

type ArticleCard = Article & { publishedTime: string; readableTime: string };

export function ArticleLink({ article }: { article: ArticleCard }) {
  const { id, image, altImage, publishedTime, readableTime, authors, title } =
    article;
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
        <time className={styles.time} dateTime={publishedTime}>
          {readableTime}
        </time>
        <p className={styles.title}>{title}</p>
      </Link>
      {authors.map(({ nick, name, anonymous }) => {
        if (anonymous) return null;

        return <ArticleAuthorLink key={nick} nick={nick} name={name} />;
      })}
    </article>
  );
}
