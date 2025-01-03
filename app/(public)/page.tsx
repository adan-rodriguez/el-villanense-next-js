import { Articles } from "../ui/components/Articles";
import { DOMAIN } from "../lib/utils";
import { Article } from "../lib/types";
import { Metadata } from "next";
import { getArticles } from "../lib/services/articles";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  description:
    "Todas las noticias de Villa Ana y las noticias más importantes de la región, de la provincia de Santa Fe, de la Argentina y del mundo.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#000000",
    },
  },
  applicationName: "El Villanense",
  openGraph: {
    title: "El Villanense",
    description:
      "Todas las noticias de Villa Ana y las noticias más importantes de la región, de la provincia de Santa Fe, de la Argentina y del mundo.",
    images: { url: `${DOMAIN}/images/logo.png`, alt: "Logo de El Villanense" },
    url: DOMAIN,
    siteName: "El Villanense",
    type: "website",
    locale: "es_LA",
  },
  twitter: {
    card: "summary_large_image",
    // site: "@elvillanense",
  },
  verification: {
    google: "hXIhjWYsPdwJV_q2u8HScKlAfFDKpIXuom958hxhjNE",
  },
  appleWebApp: {
    title: "El Villanense",
  },
};

export default async function HomePage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);

  if (!response.ok) {
    return (
      <p>
        Ocurrió un error al cargar las noticias. Intenta nuevamente más tarde.
      </p>
    );
  }

  const articles: Article[] = await response.json();

  const articlesList = articles.map((article) => {
    // Convertir el timestamp de Firebase a milisegundos
    const date = new Date(
      article.createdAt._seconds * 1000 +
        article.createdAt._nanoseconds / 1000000
    );

    // Ajustar la fecha a UTC-3 (hora local de Argentina)
    const adjustedDate = new Date(date.getTime() - 3 * 60 * 60 * 1000); // Restar 3 horas para ajustar a UTC-3

    // Formatear la fecha para el tag meta
    const publishedTime = adjustedDate.toISOString().slice(0, -8) + "-03:00";

    // Formatear la fecha para el tag time en formato legible
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Argentina/Buenos_Aires", // Ajustar zona horaria
    };

    const readableTime = new Intl.DateTimeFormat("es-AR", options).format(date);

    return {
      ...article,
      publishedTime,
      readableTime,
    };
  });

  return <Articles articles={articlesList} />;
}
