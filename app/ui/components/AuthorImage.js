import styles from "../styles/AuthorImage.module.css";

export default function AuthorImage({ src, author, width = 36, height = 36 }) {
  return (
    <img
      src={src}
      alt={`Foto de ${author}`}
      width={width}
      height={height}
      className={styles.img}
      loading="lazy"
    />
  );
}
