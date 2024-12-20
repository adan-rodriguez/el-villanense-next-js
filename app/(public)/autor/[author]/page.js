import Articles from "../../../ui/components/Articles";
import { notFound } from "next/navigation";
import styles from "@/app/ui/styles/ArticlesByAuthorPage.module.css";
import { DOMAIN } from "@/app/lib/utils";
import { getArticles } from "@/app/lib/services/articles";
import { getAuthorByNick, getAuthors } from "@/app/lib/services/authors";
import { getUser } from "@/app/lib/services/users";

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({ author: author.nick }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { author: nick } = params;

  const author = await getAuthorByNick(nick);

  if (!author) {
    return { title: "Página no encontrada - El Villanense" };
  }

  const user = await getUser(author.uid);

  const { displayName, photoURL } = user;

  return {
    title: `${displayName} - El Villanense`,
    description: `Todas las noticias publicadas por ${displayName}`,
    openGraph: {
      title: `${displayName} - El Villanense`,
      description: `Todas las noticias publicadas por ${displayName}`,
      images: { url: photoURL, alt: `Foto de ${displayName}` },
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

export default async function ArticlesByAuthorPage(props) {
  const params = await props.params;
  const { author: nick } = params;

  const author = await getAuthorByNick(nick);

  if (!author) notFound();

  const user = await getUser(author.uid);

  const articles = await getArticles({ author: nick });

  return (
    <>
      <h1 className={styles.title}>
        Noticias de <span className={styles.author}>{user.displayName}</span>
      </h1>
      <Articles articles={articles} />
    </>
  );
}
