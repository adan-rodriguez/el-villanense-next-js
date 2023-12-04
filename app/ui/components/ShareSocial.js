import Image from "next/image";
import styles from "@/app/ui/styles/Article.module.css";

export default function ShareSocial({ data }) {
  return (
    <div className={styles.share_social_container}>
      {data.map(({ href, title, src, alt }, index) => {
        return (
          <a
            className={styles.share_social_link}
            key={index}
            href={href}
            target="_blank"
            title={title}
            rel="noreferrer"
          >
            <Image
              className={styles.share_social_img}
              width={30}
              height={30}
              src={src}
              alt={alt}
            />
          </a>
        );
      })}
      <span className={styles.share_text}>Comparte la noticia</span>
    </div>
  );
}
