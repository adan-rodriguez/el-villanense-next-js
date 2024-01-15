import styles from "@/app/ui/styles/Article.module.css";
import SocialMediaLink from "./SocialMediaLink";

export default function ShareSocialMedia({ data }) {
  return (
    <div className={styles.share_social_container}>
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
      <span className={styles.share_text}>Comparte la noticia</span>
    </div>
  );
}
