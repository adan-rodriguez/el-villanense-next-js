import styles from "@/app/ui/styles/ShareSocialMedia.module.css";
import SocialMediaLink from "./SocialMediaLink";

export default function ShareSocialMedia({ data }) {
  return (
    <div className={styles.container}>
      {data.map(({ href, title, src, alt }) => {
        return (
          <SocialMediaLink
            key={href}
            href={href}
            title={title}
            src={src}
            alt={alt}
          />
        );
      })}
      <span className={styles.text}>Comparte la noticia</span>
    </div>
  );
}
