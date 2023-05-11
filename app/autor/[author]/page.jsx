import { getArticlesByAuthor } from "@/app/firebase/firebaseService";
import Script from "next/script";
import { DOMAIN } from "../../utils/constants/domain";
import Articles from "../../components/Articles";
import { users } from "../../utils/constants/users";

export const dynamicParams = false;

let authors = [];

for (let user in users) {
  authors.push(users[user].nick);
}

export function generateStaticParams() {
  return authors.map((author) => ({
    author,
  }));
}

export function generateMetadata({ params }) {
  const { author } = params;

  let name = "";

  for (let user in users) {
    if (users[user].nick === author) {
      name = users[user].name;
      break;
    }
  }

  return {
    title: `${name} - El Villanense`,
    description: `Todas las noticias publicadas por ${name}`,
    openGraph: {
      title: `${name} - El Villanense`,
      description: `Todas las noticias publicadas por ${name}`,
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

  let editor = "";

  for (let user in users) {
    if (users[user].nick === author) {
      editor = user;
      break;
    }
  }

  const articles = await getArticlesByAuthor(editor);

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
