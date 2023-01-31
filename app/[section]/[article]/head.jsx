import { getAnArticle } from "@/app/firebase/firebaseService";
import { DOMAIN } from "@/app/utils/constants/domain";
import DefaultTags from "../../DefaultTags";

export default async function HeadArticle({ params }) {
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
