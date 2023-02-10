import { getArticle } from "@/app/firebase/firebaseService";
import { DOMAIN } from "@/app/utils/constants/domain";
// import Script from "next/script";
import DefaultTags from "../../DefaultTags";

export default async function HeadArticle({ params }) {
  const { section, article: articleId } = params;

  if (
    section !== "locales" &&
    section !== "regionales" &&
    section !== "provinciales" &&
    section !== "nacionales" &&
    section !== "internacionales"
  ) {
    return (
      <>
        <DefaultTags />
        <title>Página no encontrada - El Villanense</title>
      </>
    );
  }

  const article = await getArticle(articleId);

  if (Object.keys(article).length === 1) {
    return (
      <>
        <DefaultTags />
        <title>Página no encontrada - El Villanense</title>
      </>
    );
  }

  const URL = `${DOMAIN}/${section}/${articleId}`;

  return (
    <>
      <DefaultTags />
      <title>{article.title}</title>
      <meta name="description" content={article.lead} />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.lead} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={URL} />
      <meta property="og:image" content={article.image} />
      <meta property="og:site_name" content="El Villanense" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <Script id="structured-data" type="application/ld+json">
        {`{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "${article.title}",
          "image": "${article.image}",
          "datePublished": "${article.datetimeAttribute}"
        }`}
      </Script> */}
    </>
  );
}
