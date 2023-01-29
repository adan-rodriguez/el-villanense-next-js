import DefaultTags from "./DefaultTags";
import { DOMAIN } from "./utils/constants/domain";

export default function Head() {
  return (
    <>
      <DefaultTags />
      <title>El Villanense - Portal de noticias</title>
      <meta
        name="description"
        content="Todas las noticias de Villa Ana y las noticias más importantes de la región, de la provincia de Santa Fe, de la Argentina y del mundo."
      />
      {/* <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="icons/logo/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="icons/logo/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="icons/logo/favicon-16x16.png"
      /> */}
      {/* <link rel="manifest" href="/site.webmanifest" /> */}
      {/* <link rel="canonical" href="https://www.elvillanense.com.ar/" /> */}
      <meta property="og:title" content="El Villanense" />
      <meta
        property="og:description"
        content="Todas las noticias de Villa Ana y las noticias más importantes de la región, de la provincia de Santa Fe, de la Argentina y del mundo."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={DOMAIN} />
      <meta
        property="og:image"
        content={`${DOMAIN}/icons/logo/logo.png`}
      />
      <meta property="og:site_name" content="El Villanense" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="google-site-verification" content="hXIhjWYsPdwJV_q2u8HScKlAfFDKpIXuom958hxhjNE" /> */}
      {/* <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-V6RKJKGCX2"></script>
    <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'G-V6RKJKGCX2');
    </script> */}
    </>
  );
}
