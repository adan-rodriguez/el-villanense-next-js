import SocialMediaLink from "./SocialMediaLink";
import styles from "../styles/SocialMedia.module.css";
import { socialMediaData } from "@/app/lib/utils";

export default function SocialMedia() {
  return (
    <div
      aria-label="Redes sociales de El Villanense"
      className={styles.container}
    >
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
