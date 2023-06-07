// import { getAllArticles } from "@/app/firebase/firebaseService";
import { DOMAIN } from "./utils/constants/domain";
import Articles from "./components/Articles";

// export const dynamic = "force-dynamic";

export const metadata = {
  title: "El Villanense - Portal de noticias",
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
  manifest: "/site.webmanifest",
  themeColor: "#131313",
  applicationName: "El Villanense",
  openGraph: {
    title: "El Villanense",
    description:
      "Todas las noticias de Villa Ana y las noticias más importantes de la región, de la provincia de Santa Fe, de la Argentina y del mundo.",
    images: `${DOMAIN}/images/logo.png`,
    url: DOMAIN,
    siteName: "El Villanense",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "hXIhjWYsPdwJV_q2u8HScKlAfFDKpIXuom958hxhjNE",
  },
  appleWebApp: {
    title: "El Villanense",
  },
};

export default async function Home() {
  // const articles = await getAllArticles();
  const response = await fetch("https://www.elvillanense.com.ar/api/articles");
  const articles = await response.json();

  return <Articles articles={articles} />;
}
