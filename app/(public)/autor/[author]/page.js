import Articles from "../../../ui/components/Articles";
import { users } from "../../../lib/utils";
import { notFound } from "next/navigation";
import styles from "@/app/ui/styles/ArticlesByAuthorPage.module.css";
import { DOMAIN } from "@/app/lib/utils";
import { getArticles } from "@/app/lib/services/articles";
import { unstable_cache } from "next/cache";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  return users.map((user) => ({
    author: user.nick,
  }));
}

// // Multiple versions of this page will be statically generated
// // using the `params` returned by `generateStaticParams`
// export default function Page({ params }) {
//   const { slug } = params
//   // ...
// }

export async function generateMetadata(props) {
  const params = await props.params;
  const { author: nick } = params;

  const user = users.find((user) => user.nick === nick);

  if (!user) {
    return { title: "Página no encontrada - El Villanense" };
  }

  const { name, image } = user;

  return {
    title: `${name} - El Villanense`,
    description: `Todas las noticias publicadas por ${name}`,
    openGraph: {
      title: `${name} - El Villanense`,
      description: `Todas las noticias publicadas por ${name}`,
      images: { url: image, alt: `Foto de ${name}` },
      url: `${DOMAIN}/autor/${nick}`,
      siteName: "El Villanense",
      type: "website",
      locale: "es_LA",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

const obtainArticles = unstable_cache(
  async ({ author }) => await getArticles({ author }),
  ["articles-by-author"],
  {
    tags: ["articles"],
  }
);

export default async function ArticlesByAuthorPage(props) {
  const params = await props.params;
  const { author: nick } = params;

  const user = users.find((user) => user.nick === nick);

  if (!user) notFound();

  const articles = await obtainArticles({ author: nick });

  return (
    <>
      <h1 className={styles.title}>
        Noticias de <span className={styles.author}>{user.name}</span>
      </h1>
      <Articles articles={articles} author={nick} />
    </>
  );
}
