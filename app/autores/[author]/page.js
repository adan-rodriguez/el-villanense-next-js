import Script from "next/script";
import { DOMAIN } from "../../utils/constants/domain";
import Articles from "../../components/Articles";
import { users } from "../../utils/constants/users";
import { notFound } from "next/navigation";
import { getArticlesByAuthor } from "@/app/services/articles";
import styles from "./styles/AuthorPage.module.css";

// export const dynamicParams = false;

// export function generateStaticParams() {
//   return users.map((user) => ({
//     author: user.nick,
//   }));
// }

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

  if (!user) {
    notFound();
  }

  const articles = await getArticlesByAuthor({
    name: user.name,
    nick: user.nick,
  });

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
      <h1 className={styles.title}>
        Noticias de <span className={styles.author}>{user.name}</span>
      </h1>
      <Articles articles={articles} />
    </>
  );
}
