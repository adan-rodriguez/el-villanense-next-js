import Articles from "../ui/components/Articles";
import { DOMAIN } from "../lib/utils";
import { getArticles } from "../lib/services/articles";
import { unstable_cache } from "next/cache";

export const metadata = {
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

const obtainArticles = unstable_cache(
  async () => await getArticles(),
  ["articles-home"],
  {
    tags: ["articles"],
  }
);

export default async function HomePage() {
  const articles = await obtainArticles();

  return <Articles articles={articles} />;
}
