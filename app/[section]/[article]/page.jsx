import { getAnArticle } from "@/app/firebase/firebaseService";
import { DOMAIN } from "@/app/utils/constants/domain";
import Image from "next/image";
import ArticleContent from "./ArticleContent";
import styles from "./Article.module.css";
import EditArticle from "../../components/EditButton";
import EditAndDeleteButtonsContainer from "@/app/components/EditAndDeleteButtonsContainer";

export default async function Article({ params }) {
  const { section, article } = params;

  const art = await getAnArticle(article);

  const URL = `${DOMAIN}/${section}/${article}`;

  const shareSocialLinks = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${URL}`,
      title: "Compartir en Facebook",
      src: "/icons/social/facebook.png",
      alt: "Logo de Facebook",
    },
    {
      href: `https://twitter.com/intent/tweet?text=${art.title}&url=${URL}`,
      title: "Compartir en Twitter",
      src: "/icons/social/twitter.png",
      alt: "Logo de Twitter",
    },
    {
      href: `https://api.whatsapp.com/send?text=${URL}`,
      title: "Compartir en Whatsapp",
      src: "/icons/social/whatsapp.png",
      alt: "Logo de Whatsapp",
    },
  ];

  return (
    <>
      <article className={styles.article_container}>
        <EditAndDeleteButtonsContainer
          articleId={art.id}
          section={art.section}
          style={{
            display: "flex",
            columnGap: "10px",
            margin: "5px",
            backgroundColor: "white",
          }}
        />
        <h1 className={styles.article_title}>{art.title}</h1>
        <div className={styles.share_social_container}>
          {shareSocialLinks.map(({ href, title, src, alt }, index) => {
            return (
              <a
                className={styles.share_social_link}
                key={index}
                href={href}
                target="_blank"
                title={title}
                rel="noreferrer"
              >
                <Image
                  className={styles.share_social_img}
                  width={30}
                  height={30}
                  src={src}
                  alt={alt}
                />
              </a>
            );
          })}
        </div>
        <time className={styles.article_time} dateTime={art.datetimeAttribute}>
          {art.datetimeContent}
        </time>
        <p className={styles.article_lead}>{art.lead}</p>
        {/* <Image
        className={styles.article_img}
        src={art.image}
        alt={art.altImage}
        width={500}
        height={300}
        priority
      /> */}
        <img
          className={styles.article_img}
          src={art.image}
          alt={art.altImage}
        />
        <ArticleContent content={art.content} />
      </article>
    </>
  );
}
