import Image from "next/image";
import styles from "../styles/SocialMediaLink.module.css";

export default function SocialMediaLink({ href, title, icon, alt }) {
  return (
    <a
      className={styles.link_social}
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title}
    >
      <Image width={30} height={30} src={icon} alt={alt} />
    </a>
  );
}
