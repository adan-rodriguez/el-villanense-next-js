import Image from "next/image";
import styles from "../styles/AuthorImage.module.css";

export default function AuthorImage({ src, author, width, height }) {
  return (
    <Image
      src={src}
      alt={`Foto de ${author}`}
      width={width}
      height={height}
      className={styles.author_img}
    />
  );
}
