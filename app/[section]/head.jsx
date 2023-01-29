import DefaultTags from "../DefaultTags";
import { DOMAIN } from "../utils/constants/domain";

export default function Head({ params }) {
  const section = `${params.section[0].toUpperCase()}${params.section.slice(
    1
  )}`;

  return (
    <>
      <DefaultTags />
      <title>{`${section} - El Villanense`}</title>
      <meta property="og:title" content={`${section} - El Villanense`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/${params.section}`} />
      <meta property="og:image" content={`${DOMAIN}/icons/logo/logo.png`} />
      <meta property="og:site_name" content="El Villanense" />
      <meta name="twitter:card" content="summary_large_image" />
      {section === "Locales" && (
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
      {section === "Regionales" && (
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
      {section === "Provinciales" && (
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
      {section === "Nacionales" && (
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
      {section === "Internacionales" && (
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
