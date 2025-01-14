import { Articles } from "../../../ui/components/Articles";
import { notFound } from "next/navigation";
import styles from "@/app/ui/styles/ArticlesByAuthorPage.module.css";
import { API_URL, DOMAIN } from "@/app/lib/utils";
import { getAuthorByNick /*, getAuthors*/ } from "@/app/lib/services/authors";
import { getUser } from "@/app/lib/services/users";
import { Article } from "@/app/lib/types";
import { Metadata } from "next";

// export async function generateStaticParams() {
//   const authors = await getAuthors();
//   return authors.map((author) => ({ author: author.nick }));
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ author: string }>;
}): Promise<Metadata> {
  const { author: nick } = await params;

  const author = await getAuthorByNick(nick);

  if (!author) {
    return { title: "Página no encontrada - El Villanense" };
  }

  const user = await getUser(author.id);

  const { displayName, photoURL } = user;

  return {
    title: `${displayName ?? nick} - El Villanense`,
    description: `Todas las noticias publicadas por ${displayName ?? nick}`,
    openGraph: {
      title: `${displayName ?? nick} - El Villanense`,
      description: `Todas las noticias publicadas por ${displayName}`,
      images: {
        url: photoURL ?? `${DOMAIN}/images/logo.png`,
        alt: photoURL
          ? `Foto de ${displayName ?? nick}`
          : "Logo de El Villanense",
      },
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

export default async function ArticlesByAuthorPage({
  params,
}: {
  params: Promise<{ author: string }>;
}) {
  const { author: nick } = await params;

  let author;
  try {
    author = await getAuthorByNick(nick);

    if (!author) notFound();
  } catch (error) {
    return <p>Ocurrió un error. Intenta nuevamente más tarde.</p>;
  }

  const response = await fetch(`${API_URL}/articles/${author.id}`);

  if (!response.ok) {
    return <p>Ocurrió un error. Intenta nuevamente más tarde.</p>;
  }

  const articles: Article[] = await response.json();

  const nonAnonymousArticles = articles.filter(
    (article) =>
      !article.authors.find((_author) => _author.id === author.id)?.anonymous
  );

  const articlesList = nonAnonymousArticles.map((article) => {
    // Convertir el timestamp de Firebase a milisegundos
    const date = new Date(
      article.createdAt._seconds * 1000 +
        article.createdAt._nanoseconds / 1000000
    );

    // Ajustar la fecha a UTC-3 (hora local de Argentina)
    const adjustedDate = new Date(date.getTime() - 3 * 60 * 60 * 1000); // Restar 3 horas para ajustar a UTC-3

    // Formatear la fecha para el tag meta
    const publishedTime = adjustedDate.toISOString().slice(0, -8) + "-03:00";

    const readableTime = new Intl.DateTimeFormat("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Argentina/Buenos_Aires", // Ajustar zona horaria
    }).format(date);

    return {
      ...article,
      publishedTime,
      readableTime,
    };
  });

  return (
    <div>
      <h1 className={styles.title}>
        Noticias de <span className={styles.author}>{author.name}</span>
      </h1>
      <Articles articles={articlesList} />
    </div>
  );
}
