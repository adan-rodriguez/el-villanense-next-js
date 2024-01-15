import Image from "next/image";
import styles from "../styles/SocialMediaLink.module.css";

export default function SocialMediaLink({
  href,
  title,
  src,
  alt,
  width = 30,
  height = 30,
}) {
  return (
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title}
    >
      <Image width={width} height={height} src={src} alt={alt} />
    </a>
  );
}
