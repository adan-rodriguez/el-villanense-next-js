import { getArticle } from "@/app/firebase/firebaseService";
import { DOMAIN } from "@/app/utils/constants/domain";
import Image from "next/image";
import ArticleContent from "../../components/ArticleContent";
import styles from "@/app/styles/Article.module.css";
import EditAndDeleteButtonsContainer from "@/app/components/EditAndDeleteButtonsContainer";
import Script from "next/script";
import { users } from "@/app/utils/constants/users";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { section, article: articleId } = params;

  const article = await getArticle(articleId);

  if (Object.keys(article).length === 1) {
    return { title: "Página no encontrada - El Villanense" };
  }

  if (section !== article.section) {
    return { title: "Página no encontrada - El Villanense" };
  }

  const url = `${DOMAIN}/${section}/${articleId}`;

  return {
    title: article.title,
    description: article.lead,
    openGraph: {
      title: article.title,
      description: article.lead,
      images: article.image,
      url,
      siteName: "El Villanense",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Article({ params }) {
  const { section, article: articleId } = params;

  const article = await getArticle(articleId);

  if (Object.keys(article).length === 1) {
    notFound();
  }

  if (section !== article.section) {
    notFound();
  }

  const url = `${DOMAIN}/${section}/${articleId}`;

  const shareSocialLinks = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      title: "Compartir en Facebook",
      src: "/icons/social/facebook.png",
      alt: "Logo de Facebook",
    },
    {
      href: `https://twitter.com/intent/tweet?text=${article.title}&url=${url}`,
      title: "Compartir en Twitter",
      src: "/icons/social/twitter.png",
      alt: "Logo de Twitter",
    },
    {
      href: `https://api.whatsapp.com/send?text=${url}`,
      title: "Compartir en Whatsapp",
      src: "/icons/social/whatsapp.png",
      alt: "Logo de Whatsapp",
    },
  ];

  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "NewsArticle",
  //   headline: article.title,
  //   image: article.image,
  //   datePublished: article.datetimeAttribute,
  // };

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
      {/* <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      <article className={styles.article_container}>
        <EditAndDeleteButtonsContainer
          articleId={article.id}
          section={article.section}
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
        {article.author && (
          <div className={styles.article_author_container}>
            <Image
              src={users[article.author].image}
              alt={`Foto de ${users[article.author].name}`}
              width={36}
              height={36}
              className={styles.article_author_img}
            />
            <p className={styles.article_author_name}>
              Por{" "}
              <Link href={`/autor/${users[article.author].nick}`}>
                {users[article.author].name}
              </Link>
            </p>
          </div>
        )}
        <Image
          className={styles.article_img}
          src={article.image}
          alt={article.altImage}
          width={500}
          height={300}
          priority
        />
        <ArticleContent content={article.content} />
      </article>
    </>
  );
}
