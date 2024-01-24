import ArticleAuthorLink from "./ArticleAuthorLink";
import ArticleContent from "./ArticleContent";
import AuthorImage from "./AuthorImage";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import ShareSocialMedia from "./ShareSocialMedia";
import styles from "@/app/ui/styles/Article.module.css";

export default function Article({ article, shareSocialMediaData, authors }) {
  return (
    <article className={styles.container}>
      <EditAndDeleteButtons articleId={article.id} nick={article.authors[0]} />
      <h1 className={styles.title}>{article.title}</h1>
      <ShareSocialMedia data={shareSocialMediaData} />
      <time className={styles.time} dateTime={article.datetimeAttribute}>
        {article.datetimeContent}
      </time>
      <p className={styles.lead}>{article.lead}</p>
      {article.anonymous === false &&
        authors.map(({ name, image, nick }) => (
          <div key={nick} className={styles.author_container}>
            <AuthorImage src={image} author={name} />
            <ArticleAuthorLink nick={nick} fontSize="12px" color="#0289cb" />
          </div>
        ))}
      <img
        className={styles.img}
        src={article.image}
        alt={article.altImage}
        fetchPriority="high"
      />
      <ArticleContent content={article.content} />
      <div className={styles.share_social_media_container_bottom}>
        <ShareSocialMedia data={shareSocialMediaData} />
      </div>
    </article>
  );
}
