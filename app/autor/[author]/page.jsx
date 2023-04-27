import { getArticlesByAuthor } from "@/app/firebase/firebaseService";
// import PageNotFound from "../../components/PageNotFound";
import Script from "next/script";
// import { DOMAIN } from "../../utils/constants/domain";
import Articles from "../../components/Articles";
import { users } from "../../utils/constants/users";

// export function generateMetadata({ params }) {
//   const { section } = params;

//   if (
//     section !== "locales" &&
//     section !== "regionales" &&
//     section !== "provinciales" &&
//     section !== "nacionales" &&
//     section !== "internacionales"
//   ) {
//     return { title: "Página no encontrada - El Villanense" };
//   }

//   let description;

//   if (section === "locales") {
//     description =
//       "Todas las noticias de Villa Ana. Policiales, Política, Sociedad, Deportes, Cultura y todo lo demás.";
//   } else if (section === "regionales") {
//     description =
//       "Las noticias más importantes del departamento General Obligado. Reconquista, Villa Ocampo, Las Toscas, Florencia, etc.";
//   } else if (section === "provinciales") {
//     description = "Las noticias más importantes de la provincia de Santa Fe.";
//   } else if (section === "nacionales") {
//     description = "Las noticias más importantes de la República Argentina.";
//   } else if (section === "internacionales") {
//     description = "Las noticias mas importantes del mundo.";
//   }

//   const uppercaseSection = `${section[0].toUpperCase()}${section.slice(1)}`;

//   return {
//     title: `${uppercaseSection} - El Villanense`,
//     description,
//     openGraph: {
//       title: `${uppercaseSection} - El Villanense`,
//       description,
//       images: `${DOMAIN}/images/logo.png`,
//       url: `${DOMAIN}/${section}`,
//       siteName: "El Villanense",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//     },
//   };
// }

export default async function ArticlesByAuthor({ params }) {
  const { author } = params;
  console.log(author);

  let editor = "";

  for (let user in users) {
    if (users[user].nick === author) {
      editor = user;
      break;
    }
  }

  console.log(editor);

  //   if (
  //     section !== "locales" &&
  //     section !== "regionales" &&
  //     section !== "provinciales" &&
  //     section !== "nacionales" &&
  //     section !== "internacionales"
  //   ) {
  //     return <PageNotFound />;
  //   }

  const articles = await getArticlesByAuthor(editor);
  console.log(articles);

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
