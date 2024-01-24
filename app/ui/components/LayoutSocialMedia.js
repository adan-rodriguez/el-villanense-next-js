import SocialMediaLink from "./SocialMediaLink";
import styles from "../styles/LayoutSocialMedia.module.css";
import { socialMediaData } from "@/app/lib/utils";

export default function LayoutSocialMedia() {
  return (
    <div className={styles.container}>
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
