import ArticleContent from "../../ui/components/ArticleContent";
import styles from "@/app/ui/styles/Article.module.css";
import EditAndDeleteButtons from "@/app/ui/components/EditAndDeleteButtons";
import { users } from "@/app/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle } from "@/app/lib/services/articles";
import ShareSocialMedia from "../../ui/components/ShareSocialMedia";
import { DOMAIN } from "../../lib/utils";
import { routes } from "../../lib/routes";
import AuthorImage from "../../ui/components/AuthorImage";

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
      ...(article.author &&
        !article.authors?.anonymous && { authors: article.author?.names }),
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

  const shareSocialMediaData = [
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: article.image,
    datePublished: article.datetimeAttribute,
    ...(article.authors &&
      !article.authors.anonymous &&
      article.authors.names.forEach((name) => {
        return {
          author: {
            "@type": "Person",
            name,
            url:
              DOMAIN +
              "/" +
              name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(" ", "-"),
          },
        };
      })),
    publisher: {
      "@type": "Organization",
      name: "El Villanense",
      logo: `${DOMAIN}/images/logo.png`,
    },
    url: DOMAIN + "/" + article.id,
  };

  const authors = users.filter((user) =>
    article.authors?.names.includes(user.name)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <article className={styles.article_container}>
        <EditAndDeleteButtons articleId={article.id} />
        <h1 className={styles.article_title}>{article.title}</h1>
        <ShareSocialMedia data={shareSocialMediaData} />
        <time
          className={styles.article_time}
          dateTime={article.datetimeAttribute}
        >
          {article.datetimeContent}
        </time>
        <p className={styles.article_lead}>{article.lead}</p>
        {!article.authors?.anonymous &&
          authors.map((author, index) => (
            <div key={index} className={styles.article_author_container}>
              <AuthorImage src={author.image} author={author.name} />
              <p className={styles.article_author_name}>
                Por{" "}
                <Link
                  className={styles.article_author_name_link}
                  href={`${routes.authors.root}/${author.nick}`}
                >
                  {author.name}
                </Link>
              </p>
            </div>
          ))}
        <img
          className={styles.article_img}
          src={article.image}
          alt={article.altImage}
          fetchPriority="high"
        />
        <ArticleContent content={article.content} />
        <div className={styles.share_social_container_bottom}>
          <ShareSocialMedia data={shareSocialMediaData} />
        </div>
      </article>
    </>
  );
}
