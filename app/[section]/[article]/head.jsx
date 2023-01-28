import { getAnArticle } from "@/app/firebase/firebaseService";
import DefaultTags from "../../DefaultTags";

const DOMAIN = "https://elvillanense.vercel.app/";

export default async function Head({ params }) {
  const { section, article } = params;

  const art = await getAnArticle(article);

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
