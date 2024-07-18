import Link from "next/link";
import styles from "../styles/Logo.module.css";

export default function Logo() {
  return (
    <Link
      translate="no"
      className={styles.logo}
      href="/"
      aria-label="Ir al inicio"
    >
      El Villanense
    </Link>
  );
}
