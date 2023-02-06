import DefaultTags from "../DefaultTags";
import { DOMAIN } from "../utils/constants/domain";

export default function HeadSection({ params }) {
  const { section } = params;

  if (
    section !== "locales" &&
    section !== "regionales" &&
    section !== "provinciales" &&
    section !== "nacionales" &&
    section !== "internacionales"
  ) {
    return (
      <>
        <DefaultTags />
        <title>Página no encontrada - El Villanense</title>
      </>
    );
  }

  const uppercaseSection = `${section[0].toUpperCase()}${section.slice(1)}`;

  return (
    <>
      <DefaultTags />
      <title>{`${uppercaseSection} - El Villanense`}</title>
      <meta
        property="og:title"
        content={`${uppercaseSection} - El Villanense`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/${section}`} />
      <meta property="og:image" content={`${DOMAIN}/images/logo.png`} />
      <meta property="og:site_name" content="El Villanense" />
      <meta name="twitter:card" content="summary_large_image" />
      {section === "locales" && (
        <>
          <meta
            name="description"
            content="Todas las noticias de Villa Ana. Policiales, Política, Sociedad, Deportes, Cultura y todo lo demás."
          />
          <meta
            property="og:description"
            content="Todas las noticias de Villa Ana. Policiales, Política, Sociedad, Deportes, Cultura y todo lo demás."
          />
        </>
      )}
      {section === "regionales" && (
        <>
          <meta
            name="description"
            content="Las noticias más importantes del departamento General Obligado. Reconquista, Villa Ocampo, Las Toscas, Florencia, etc."
          />
          <meta
            property="og:description"
            content="Las noticias más importantes del departamento General Obligado. Reconquista, Villa Ocampo, Las Toscas, Florencia, etc."
          />
        </>
      )}
      {section === "provinciales" && (
        <>
          <meta
            name="description"
            content="Las noticias más importantes de la provincia de Santa Fe."
          />
          <meta
            property="og:description"
            content="Las noticias más importantes de la provincia de Santa Fe."
          />
        </>
      )}
      {section === "nacionales" && (
        <>
          <meta
            name="description"
            content="Las noticias más importantes de la República Argentina."
          />
          <meta
            property="og:description"
            content="Las noticias más importantes de la República Argentina."
          />
        </>
      )}
      {section === "internacionales" && (
        <>
          <meta
            name="description"
            content="Las noticias mas importantes del mundo."
          />
          <meta
            property="og:description"
            content="Las noticias mas importantes del mundo."
          />
        </>
      )}
    </>
  );
}
