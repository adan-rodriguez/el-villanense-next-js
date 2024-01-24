import Image from "next/image";
import styles from "../styles/AuthorImage.module.css";

export default function AuthorImage({ src, author, width = 36, height = 36 }) {
  return (
    <Image
      src={src}
      alt={`Foto de ${author}`}
      width={width}
      height={height}
      className={styles.img}
    />
  );
}
