import { DOMAIN } from "@/app/utils/constants/domain";
import Image from "next/image";
import ArticleContent from "../components/ArticleContent";
import styles from "@/app/styles/Article.module.css";
import EditAndDeleteButtonsContainer from "@/app/components/EditAndDeleteButtonsContainer";
import { users } from "@/app/utils/constants/users";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle } from "@/app/services/articles";
import ShareSocial from "../components/ShareSocial";

export async function generateMetadata({ params }) {
  const { article: articleId } = params;

  let article;

  try {
    article = await getArticle({ articleId });
  } catch {
    return { title: "Página no encontrada - El Villanense" };
  }

  const url = `${DOMAIN}/${articleId}`;

  return {
    title: article.title,
    description: article.lead,
    openGraph: {
      title: article.title,
      description: article.lead,
      images: [{ url: article.image, alt: article.altImage }],
      url,
      siteName: "El Villanense",
      type: "article",
      publishedTime: article.datetimeAttribute,
      ...(article.author && { authors: article.author }),
    },
    twitter: {
      card: "summary_large_image",
      // site: "@elvillanense",
    },
  };
}

export default async function Article({ params }) {
  const { article: articleId } = params;

  let article;

  try {
    article = await getArticle({ articleId });
  } catch {
    notFound();
  }

  const url = `${DOMAIN}/${articleId}`;

  const shareSocialData = [
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: article.image,
    datePublished: article.datetimeAttribute,
  };

  const user = users.find((user) => user.name === article.author);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={styles.article_container}>
        <EditAndDeleteButtonsContainer articleId={article.id} />
        <h1 className={styles.article_title}>{article.title}</h1>
        <ShareSocial data={shareSocialData} />
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
              src={user.image}
              alt={`Foto de ${user.name}`}
              width={36}
              height={36}
              className={styles.article_author_img}
            />
            <p className={styles.article_author_name}>
              Por{" "}
              <Link
                className={styles.article_author_name_link}
                href={`/autores/${user.nick}`}
              >
                {article.author}
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
        <div className={styles.share_social_container_bottom}>
          <ShareSocial data={shareSocialData} />
        </div>
      </article>
    </>
  );
}
