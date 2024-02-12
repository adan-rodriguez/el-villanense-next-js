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
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    </a>
  );
}
