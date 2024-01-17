import Articles from "../../../ui/components/Articles";
import { users } from "../../../lib/utils";
import { notFound } from "next/navigation";
import styles from "@/app/ui/styles/AuthorPage.module.css";
import { DOMAIN } from "@/app/lib/utils";

export function generateMetadata({ params }) {
  const { author: nick } = params;

  const user = users.find((user) => user.nick === nick);

  if (!user) {
    return { title: "Página no encontrada - El Villanense" };
  }

  const { name } = user;

  return {
    title: `${name} - El Villanense`,
    description: `Todas las noticias publicadas por ${name}`,
    openGraph: {
      title: `${name} - El Villanense`,
      description: `Todas las noticias publicadas por ${name}`,
      images: `${DOMAIN}/images/logo.png`,
      url: `${DOMAIN}/autor/${nick}`,
      siteName: "El Villanense",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function ArticlesByAuthor({ params }) {
  const { author: nick } = params;

  const user = users.find((user) => user.nick === nick);

  if (!user) notFound();

  return (
    <>
      <h1 className={styles.title}>
        Noticias de <span className={styles.author}>{user.name}</span>
      </h1>
      <Articles author={nick} />
    </>
  );
}
