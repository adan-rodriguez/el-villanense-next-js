import SocialMediaLink from "./SocialMediaLink";
import styles from "./SocialMedia.module.css";

const socialLinks = [
  {
    href: "https://www.facebook.com/elvillanense/",
    title: "Seguinos en Facebook",
    icon: "/icons/social/facebook.png",
    alt: "Logo de Facebook",
  },
  {
    href: "https://www.instagram.com/el_villanense/?hl=es-la",
    title: "Seguinos en Instagram",
    icon: "/icons/social/instagram.png",
    alt: "Logo de Instagram",
  },
  {
    href: "https://twitter.com/Adan_Rodriguez_",
    title: "Seguinos en Twitter",
    icon: "/icons/social/twitter.png",
    alt: "Logo de Twitter",
  },
];

export default function SocialMedia({ classname }) {
  return (
    <div className={`${styles[classname]} ${styles.links_social_container}`}>
      {socialLinks.map(({ href, title, icon, alt }) => (
        <SocialMediaLink
          key={href}
          href={href}
          title={title}
          icon={icon}
          alt={alt}
        />
      ))}
    </div>
  );
}
