import styles from "../styles/AuthorImage.module.css";

export function AuthorImage({
  name,
  image,
  width = 36,
  height = 36,
}: {
  name?: string | null;
  image?: string | null;
  width?: number;
  height?: number;
}) {
  return (
    <img
      src={
        image ??
        "https://res.cloudinary.com/dh4eh6jen/image/upload/v1703888334/el-villanense-redactores/person-icon_itua0j.webp"
      }
      alt={image ? `Foto de ${name ? name : "autor"}` : "Icono de persona"}
      width={width}
      height={height}
      className={styles.img}
    />
  );
}
