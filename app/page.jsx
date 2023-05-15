import { getAllArticles } from "@/app/firebase/firebaseService";
import RevalidateButton from "./components/RevalidateButton";
import Script from "next/script";
import { DOMAIN } from "./utils/constants/domain";
import Articles from "./components/Articles";
import Image from "next/image";

export const dynamic = "force-static";

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
  const articles = await getAllArticles();

  return (
    <>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-V6RKJKGCX2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-V6RKJKGCX2');
        `}
      </Script>
      <Articles articles={articles} />
    </>
  );
}
