import Image from "next/image";
import ArticleContent from "../ui/components/ArticleContent";
import styles from "@/app/ui/styles/Article.module.css";
import EditAndDeleteButtonsContainer from "@/app/ui/components/EditAndDeleteButtonsContainer";
import { users } from "@/app/lib/users";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle } from "@/app/lib/services/articles";
import ShareSocial from "../ui/components/ShareSocial";
import { DOMAIN } from "../lib/constants";
import { routes } from "../lib/routes";

export async function generateMetadata({ params }) {
  const { article: articleId } = params;

  const article = await getArticle({ articleId });

  if (!article) return { title: "Página no encontrada - El Villanense" };

  return {
    title: article.title,
    description: article.lead,
    openGraph: {
      title: article.title,
      description: article.lead,
      images: [{ url: article.image, alt: article.altImage }],
      url: `${DOMAIN}/${articleId}`,
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

  const article = await getArticle({ articleId });

  if (!article) notFound();

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
                href={`${routes.authors.root}/${user.nick}`}
              >
                {article.author}
              </Link>
            </p>
          </div>
        )}
        <img
          className={styles.article_img}
          src={article.image}
          alt={article.altImage}
          fetchPriority="high"
        />
        <ArticleContent content={article.content} />
        <div className={styles.share_social_container_bottom}>
          <ShareSocial data={shareSocialData} />
        </div>
      </article>
    </>
  );
}
