import styles from "../styles/SocialMediaLink.module.css";

export default function SocialMediaLink({
  href,
  title,
  src,
  alt,
  width = 24,
  height = 24,
}) {
  return (
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title}
      aria-label={title}
    >
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    </a>
  );
}
