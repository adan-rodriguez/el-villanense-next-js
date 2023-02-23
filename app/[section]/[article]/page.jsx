import { getArticle } from "@/app/firebase/firebaseService";
import { DOMAIN } from "@/app/utils/constants/domain";
import Image from "next/image";
import ArticleContent from "./ArticleContent";
import styles from "./Article.module.css";
import EditAndDeleteButtonsContainer from "@/app/components/EditAndDeleteButtonsContainer";
import PageNotFound from "@/app/components/PageNotFound";
import Script from "next/script";

export default async function Article({ params }) {
  const { section, article: articleId } = params;

  if (
    section !== "locales" &&
    section !== "regionales" &&
    section !== "provinciales" &&
    section !== "nacionales" &&
    section !== "internacionales"
  ) {
    return <PageNotFound />;
  }

  const article = await getArticle(articleId);

  if (Object.keys(article).length === 1) {
    return <PageNotFound />;
  }

  if (section !== article.section) {
    return <PageNotFound />;
  }

  const URL = `${DOMAIN}/${section}/${articleId}`;

  const shareSocialLinks = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${URL}`,
      title: "Compartir en Facebook",
      src: "/icons/social/facebook.png",
      alt: "Logo de Facebook",
    },
    {
      href: `https://twitter.com/intent/tweet?text=${article.title}&url=${URL}`,
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
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-V6RKJKGCX2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-V6RKJKGCX2');
        `}
      </Script>
      <article className={styles.article_container}>
        <EditAndDeleteButtonsContainer
          articleId={article.id}
          section={article.section}
          style={{
            display: "flex",
            columnGap: "10px",
            margin: "5px",
            backgroundColor: "white",
          }}
        />
        <h1 className={styles.article_title}>{article.title}</h1>
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
        <time
          className={styles.article_time}
          dateTime={article.datetimeAttribute}
        >
          {article.datetimeContent}
        </time>
        <p className={styles.article_lead}>{article.lead}</p>
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
          src={article.image}
          alt={article.altImage}
          loading="lazy"
        />
        <ArticleContent content={article.content} />
      </article>
    </>
  );
}
