import { Author, Article as TArticle } from "@/app/lib/types";
import { ArticleAuthorLink } from "./ArticleAuthorLink";
import { ArticleContent } from "./ArticleContent";
import { AuthorImage } from "./AuthorImage";
import { ShareSocialMedia } from "./ShareSocialMedia";
import styles from "@/app/ui/styles/Article.module.css";

export default function Article({
  article,
  publishedTime,
  readableTime,
  authors,
}: {
  article: TArticle;
  publishedTime: string;
  readableTime: string;
  authors: Author[];
}) {
  const { id, title, lead, image, altImage, content, anonymous } = article;
  return (
    <article className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <ShareSocialMedia id={id} title={title} />
      <time className={styles.time} dateTime={publishedTime}>
        {readableTime}
      </time>
      <p className={styles.lead}>{lead}</p>
      {!anonymous &&
        authors.map(({ name, image, nick }) => (
          <div key={nick} className={styles.author_container}>
            <AuthorImage name={name} image={image} />
            <ArticleAuthorLink nick={nick} fontSize="12px" color="#0289cb" />
          </div>
        ))}
      <img
        className={styles.img}
        src={image}
        alt={altImage}
        fetchPriority="high"
      />
      <ArticleContent content={content} />
      <div className={styles.share_social_media_container_bottom}>
        <ShareSocialMedia id={id} title={title} />
      </div>
    </article>
  );
}
