import { users } from "@/app/lib/utils";
import { notFound } from "next/navigation";
import { getArticle } from "@/app/lib/services/articles";
import { DOMAIN } from "../../lib/utils";
import Article from "@/app/ui/components/Article";

export async function generateMetadata(props) {
  const params = await props.params;
  const { article: articleId } = params;

  const article = await getArticle({ articleId });

  if (!article) return { title: "Página no encontrada - El Villanense" };

  const {
    title,
    lead,
    image,
    altImage,
    datetimeAttribute,
    authors,
    anonymous,
  } = article;

  const facebookProfiles = users.map(
    (user) => authors.includes(user.nick) && user.facebook
  );

  return {
    title: title,
    description: lead,
    openGraph: {
      title: title,
      description: lead,
      images: { url: image, alt: altImage },
      url: `${DOMAIN}/${articleId}`,
      siteName: "El Villanense",
      type: "article",
      locale: "es_LA",
      publishedTime: datetimeAttribute,
      // ...(lastModified && {modifiedTime: lastModified}),
      // publisher: "https://www.facebook.com/elvillanense",
      // section: "locales",
      ...(anonymous === false && { authors: facebookProfiles }),
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

export default async function ArticlePage(props) {
  const params = await props.params;
  const { article: articleId } = params;

  const article = await getArticle({ articleId });

  if (!article) notFound();

  const url = `${DOMAIN}/${article.id}`;

  const shareSocialMediaData = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      title: "Compartir en Facebook",
      src: "/icons/social/facebook.svg",
      alt: "Logo de Facebook",
    },
    {
      href: `https://twitter.com/intent/tweet?text=${article.title}&url=${url}`,
      title: "Compartir en X",
      src: "/icons/social/x.png",
      alt: "Logo de X",
    },
    {
      href: `https://api.whatsapp.com/send?text=${url}`,
      title: "Compartir en Whatsapp",
      src: "/icons/social/whatsapp.svg",
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
              url: `${DOMAIN}/${author.nick}`,
            })),
          }
        : {
            author: {
              "@type": "Person",
              name: authors[0].name,
              url: `${DOMAIN}/${authors[0].nick}`,
            },
          })),
    publisher: {
      "@type": "Organization",
      name: "El Villanense",
      logo: `${DOMAIN}/images/logo.png`,
    },
    url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Article
        article={article}
        shareSocialMediaData={shareSocialMediaData}
        authors={authors}
      />
    </>
  );
}
