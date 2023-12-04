import Articles from "../../ui/components/Articles";
import { users } from "../../lib/users";
import { notFound } from "next/navigation";
import { getArticles } from "@/app/lib/services/articles";
import styles from "@/app/ui/styles/AuthorPage.module.css";
import { DOMAIN } from "@/app/lib/constants";

export function generateMetadata({ params }) {
  const { author } = params;

  const user = users.find((user) => user.nick === author);

  if (!user) {
    return { title: "Página no encontrada - El Villanense" };
  }

  return {
    title: `${user.name} - El Villanense`,
    description: `Todas las noticias publicadas por ${user.name}`,
    openGraph: {
      title: `${user.name} - El Villanense`,
      description: `Todas las noticias publicadas por ${user.name}`,
      images: `${DOMAIN}/images/logo.png`,
      url: `${DOMAIN}/autor/${author}`,
      siteName: "El Villanense",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function ArticlesByAuthor({ params }) {
  const { author } = params;

  const user = users.find((user) => user.nick === author);

  if (!user) notFound();

  const articles = await getArticles({
    author: user.name,
  });

  return (
    <>
      <h1 className={styles.title}>
        Noticias de <span className={styles.author}>{user.name}</span>
      </h1>
      <Articles articles={articles} />
    </>
  );
}
