import Link from "next/link";
import styles from "../styles/Logo.module.css";

export default function Logo() {
  return (
    <Link className={styles.logo} href="/" title="Inicio">
      El Villanense
    </Link>
  );
}
