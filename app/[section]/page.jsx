// import Image from "next/image";
import Link from "next/link";
import { getSectionArticles } from "@/app/firebase/firebaseService";
import styles from "./Section.module.css";
import EditAndDeleteButtonsContainer from "../components/EditAndDeleteButtonsContainer";
import PageNotFound from "../components/PageNotFound";
import Script from "next/script";
import { DOMAIN } from "../utils/constants/domain";
import { users } from "../utils/constants/users";

export function generateMetadata({ params }) {
  const { section } = params;

  if (
    section !== "locales" &&
    section !== "regionales" &&
    section !== "provinciales" &&
    section !== "nacionales" &&
    section !== "internacionales"
  ) {
    return { title: "Página no encontrada - El Villanense" };
  }

  let description;

  if (section === "locales") {
    description =
      "Todas las noticias de Villa Ana. Policiales, Política, Sociedad, Deportes, Cultura y todo lo demás.";
  } else if (section === "regionales") {
    description =
      "Las noticias más importantes del departamento General Obligado. Reconquista, Villa Ocampo, Las Toscas, Florencia, etc.";
  } else if (section === "provinciales") {
    description = "Las noticias más importantes de la provincia de Santa Fe.";
  } else if (section === "nacionales") {
    description = "Las noticias más importantes de la República Argentina.";
  } else if (section === "internacionales") {
    description = "Las noticias mas importantes del mundo.";
  }

  const uppercaseSection = `${section[0].toUpperCase()}${section.slice(1)}`;

  return {
    title: `${uppercaseSection} - El Villanense`,
    description,
    openGraph: {
      title: `${uppercaseSection} - El Villanense`,
      description,
      images: `${DOMAIN}/images/logo.png`,
      url: `${DOMAIN}/${section}`,
      siteName: "El Villanense",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Section({ params }) {
  const { section } = params;

  if (
    section !== "locales" &&
    section !== "regionales" &&
    section !== "provinciales" &&
    section !== "nacionales" &&
    section !== "internacionales"
  ) {
    return <PageNotFound />;
  }

  const articles = await getSectionArticles(section);

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
      <h1
        className={styles.section_page_title}
      >{`Noticias ${section[0].toUpperCase()}${section.slice(1)}`}</h1>
      <div className={styles.articles_links_container}>
        {articles.map((article) => (
          <Link
            className={styles.article_link}
            key={article.id}
            href={`/${article.section}/${article.id}`}
          >
            <article>
              {/* <Image
                className={styles.article_link_img}
                src={article.image}
                alt={article.altImage}
                width={500}
                height={300}
                priority
              /> */}
              <EditAndDeleteButtonsContainer
                articleId={article.id}
                section={article.section}
                style={{
                  position: "absolute",
                  display: "flex",
                  columnGap: "10px",
                  margin: "5px",
                  backgroundColor: "white",
                }}
              />
              <img
                className={styles.article_link_img}
                src={article.image}
                alt={article.altImage}
                loading="lazy"
              />
              <time
                className={styles.article_link_time}
                dateTime={article.datetimeAttribute}
              >
                {article.dateContent}
              </time>
              <p className={styles.article_link_title}>{article.title}</p>
              {article.author && (
                <p style={{ fontSize: "11px", opacity: "0.7" }}>
                  Por <strong>{users[article.author]?.name}</strong>
                </p>
              )}
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
