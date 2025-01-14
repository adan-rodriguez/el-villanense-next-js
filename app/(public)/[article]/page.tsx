import { API_URL, DOMAIN } from "@/app/lib/utils";
import { notFound } from "next/navigation";
import ArticleComponent from "@/app/ui/components/Article";
import { Article } from "@/app/lib/types";
import { Metadata } from "next";

// Durante next build, se generan todas las publicaciones de blog conocidas
// Todas las solicitudes realizadas a estas páginas se almacenan en caché y son instantáneas.
// Si se solicita utra publicacion, Next.js generará y almacenará en caché esta página a pedido
export async function generateStaticParams() {
  const response = await fetch(`${API_URL}/articles`);
  const articles: Article[] = await response.json();

  return articles.map((article) => ({ article: article.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ article: string }>;
}): Promise<Metadata> {
  const { article: id } = await params;

  const response = await fetch(`${API_URL}/article/${id}`);

  if (response.status === 404) {
    return { title: "Página no encontrada - El Villanense" };
  }

  if (!response.ok) {
    return { title: "Error - El Villanense" };
  }

  const article: Article = await response.json();

  const { title, lead, image, altImage, createdAt, lastModified } = article;

  const date = new Date(
    createdAt._seconds * 1000 + createdAt._nanoseconds / 1000000
  );

  const adjustedDate = new Date(date.getTime() - 3 * 60 * 60 * 1000);

  const publishedTime = adjustedDate.toISOString().slice(0, -8) + "-03:00";

  let modifiedTime;
  if (lastModified) {
    const dateModified = new Date(
      lastModified._seconds * 1000 + lastModified._nanoseconds / 1000000
    );

    const adjustedDateModified = new Date(
      dateModified.getTime() - 3 * 60 * 60 * 1000
    );

    modifiedTime = adjustedDateModified.toISOString().slice(0, -8) + "-03:00";
  }

  return {
    title: title,
    description: lead,
    openGraph: {
      title: title,
      description: lead,
      images: { url: image, alt: altImage },
      url: `${DOMAIN}/${id}`,
      siteName: "El Villanense",
      type: "article",
      locale: "es_LA",
      publishedTime,
      modifiedTime,
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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const { article: id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article/${id}`
  );

  if (response.status === 404) notFound();

  if (!response.ok) {
    return (
      <p>
        Ocurrió un error al cargar la noticia. Intenta nuevamente más tarde.
      </p>
    );
  }

  const article: Article = await response.json();

  const { title, image, authors, createdAt } = article;

  const date = new Date(
    createdAt._seconds * 1000 + createdAt._nanoseconds / 1000000
  );

  const adjustedDate = new Date(date.getTime() - 3 * 60 * 60 * 1000);

  const publishedTime = adjustedDate.toISOString().slice(0, -8) + "-03:00";

  const readableTime = new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Para usar formato 24 horas
    timeZone: "America/Argentina/Buenos_Aires", // Ajustar zona horaria
  }).format(date);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    image,
    datePublished: publishedTime,
    author: authors.map(({ nick, name, anonymous }) => {
      if (anonymous) return;

      return {
        "@type": "Person",
        name,
        url: `${DOMAIN}/${nick}`,
      };
    }),
    publisher: {
      "@type": "Organization",
      name: "El Villanense",
      logo: `${DOMAIN}/images/logo.png`,
    },
    url: `${DOMAIN}/${id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ArticleComponent
        article={article}
        publishedTime={publishedTime}
        readableTime={readableTime}
      />
    </>
  );
}
