import { getArticle } from "@/app/firebase/firebaseService";
import { DOMAIN } from "@/app/utils/constants/domain";
import DefaultTags from "../../DefaultTags";

export default async function HeadArticle({ params }) {
  const { section, article } = params;

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

  const art = await getArticle(article);

  if (Object.keys(art).length === 1) {
    return (
      <>
        <DefaultTags />
        <title>Página no encontrada - El Villanense</title>
      </>
    );
  }

  const URL = `${DOMAIN}/${section}/${article}`;

  return (
    <>
      <DefaultTags />
      <title>{art.title}</title>
      <meta name="description" content={art.lead} />
      <meta property="og:title" content={art.title} />
      <meta property="og:description" content={art.lead} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={URL} />
      <meta property="og:image" content={art.image} />
      <meta property="og:site_name" content="El Villanense" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
