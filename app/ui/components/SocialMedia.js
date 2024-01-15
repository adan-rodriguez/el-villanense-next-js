import SocialMediaLink from "./SocialMediaLink";
import styles from "../styles/SocialMedia.module.css";

const socialMediaData = [
  {
    href: "https://www.facebook.com/elvillanense/",
    title: "Seguinos en Facebook",
    src: "/icons/social/facebook.png",
    alt: "Logo de Facebook",
  },
  {
    href: "https://www.instagram.com/el_villanense/?hl=es-la",
    title: "Seguinos en Instagram",
    src: "/icons/social/instagram.png",
    alt: "Logo de Instagram",
  },
  {
    href: "https://twitter.com/Adan_Rodriguez_",
    title: "Seguinos en Twitter",
    src: "/icons/social/twitter.png",
    alt: "Logo de Twitter",
  },
];

export default function SocialMedia({ classname }) {
  return (
    <div className={`${styles[classname]} ${styles.links_social_container}`}>
      {socialMediaData.map(({ href, title, src, alt }) => (
        <SocialMediaLink
          key={href}
          href={href}
          title={title}
          src={src}
          alt={alt}
        />
      ))}
    </div>
  );
}
