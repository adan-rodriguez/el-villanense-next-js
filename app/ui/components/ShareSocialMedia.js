import styles from "@/app/ui/styles/ShareSocialMedia.module.css";
import SocialMediaLink from "./SocialMediaLink";

export default function ShareSocialMedia({ data, isBottom }) {
  return (
    <div className={`${styles.container} ${isBottom ? styles.bottom : ""}`}>
      <span className={styles.share__text}>Comparte la noticia</span>
      <div className={styles.links__container}>
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
      </div>
    </div>
  );
}
