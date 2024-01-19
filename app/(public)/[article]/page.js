import ArticleContent from "../../ui/components/ArticleContent";
import styles from "@/app/ui/styles/Article.module.css";
import EditAndDeleteButtons from "@/app/ui/components/EditAndDeleteButtons";
import { users } from "@/app/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle } from "@/app/lib/services/articles";
import ShareSocialMedia from "../../ui/components/ShareSocialMedia";
import { DOMAIN } from "../../lib/utils";
import AuthorImage from "../../ui/components/AuthorImage";

export async function generateMetadata({ params }) {
  const { article: articleId } = params;

  const article = await getArticle({ articleId });

  if (!article) return { title: "Página no encontrada - El Villanense" };

  const facebookProfiles = users.map(
    (user) => article.authors.includes(user.nick) && user.facebook
  );

  return {
    title: article.title,
    description: article.lead,
    openGraph: {
      title: article.title,
      description: article.lead,
      images: { url: article.image, alt: article.altImage },
      url: `${DOMAIN}/${article.id}`,
      siteName: "El Villanense",
      type: "article",
      locale: "es_LA",
      publishedTime: article.datetimeAttribute,
      // ...(article.lastModified && {modifiedTime: article.lastModified}),
      // publisher: "https://www.facebook.com/elvillanense",
      // section: "locales",
      ...(article.anonymous === false && { authors: facebookProfiles }),
    },
    twitter: {
      card: "summary_large_image",
      // site: "@elvillanense",
      // siteId: "1467726470533754880",
      // creator: "@nextjs",
      // creatorId: "1467726470533754880",
    },
    other: {
      "article:publisher": "https://www.facebook.com/elvillanense",
    },
    // other: {
    //   "profile:first_name": "Adán",
    //   "profile:last_name": "Rodríguez",
    //   "profile:username": "adan-rodriguez",
    //   "profile:gender": "male",
    // },
  };
}

export default async function Article({ params }) {
  const { article: articleId } = params;

  const article = await getArticle({ articleId });

  if (!article) notFound();

  const url = `${DOMAIN}/${article.id}`;

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

  const authors = users.filter((user) => article.authors.includes(user.nick));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: article.image,
    datePublished: article.datetimeAttribute,
    ...(article.anonymous === false &&
      (authors.length > 1
        ? {
            author: authors.map((author) => ({
              "@type": "Person",
              name: author.name,
              url: DOMAIN + "/" + author.nick,
            })),
          }
        : {
            author: {
              "@type": "Person",
              name: authors[0].name,
              url: DOMAIN + "/" + authors[0].nick,
            },
          })),
    publisher: {
      "@type": "Organization",
      name: "El Villanense",
      logo: `${DOMAIN}/images/logo.png`,
    },
    url: DOMAIN + "/" + article.id,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <article className={styles.article_container}>
        <EditAndDeleteButtons
          articleId={article.id}
          nick={article.authors[0]}
        />
        <h1 className={styles.article_title}>{article.title}</h1>
        <ShareSocialMedia data={shareSocialMediaData} />
        <time
          className={styles.article_time}
          dateTime={article.datetimeAttribute}
        >
          {article.datetimeContent}
        </time>
        <p className={styles.article_lead}>{article.lead}</p>
        {article.anonymous === false &&
          authors.map(({ name, image, nick }) => (
            <div key={nick} className={styles.article_author_container}>
              <AuthorImage src={image} author={name} />
              <p className={styles.article_author_name}>
                Por{" "}
                <Link
                  className={styles.article_author_name_link}
                  href={`/autor/${nick}`}
                >
                  {name}
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
