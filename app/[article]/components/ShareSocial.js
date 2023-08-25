import Image from "next/image";
import styles from "@/app/styles/Article.module.css";

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
      <span
        style={{
          position: "absolute",
          fontSize: "10px",
          textTransform: "uppercase",
          marginTop: "29px",
          marginLeft: "1px",
          opacity: ".8",
        }}
      >
        Comparte la noticia
      </span>
    </div>
  );
}
