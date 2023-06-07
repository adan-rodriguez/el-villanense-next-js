// import { getSectionArticles } from "@/app/firebase/firebaseService";
import styles from "../styles/Section.module.css";
import { DOMAIN } from "../utils/constants/domain";
import Articles from "../components/Articles";
import { notFound } from "next/navigation";

// export const dynamicParams = false;
// true (default): Dynamic segments not included in generateStaticParams are generated on demand.
// false: Dynamic segments not included in generateStaticParams will return a 404.

// export function generateStaticParams() {
//   return [
//     { section: "locales" },
//     { section: "regionales" },
//     { section: "provinciales" },
//     { section: "nacionales" },
//     { section: "internacionales" },
//   ];
// }

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
    notFound();
  }

  // const articles = await getSectionArticles(section);
  const response = await fetch(
    `https://www.elvillanense.com.ar/api/articles/${section}`
  );
  const articles = await response.json();

  return (
    <>
      <h1
        className={styles.section_page_title}
      >{`Noticias ${section[0].toUpperCase()}${section.slice(1)}`}</h1>
      <Articles articles={articles} />
    </>
  );
}
