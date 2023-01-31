import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link
      style={{ marginLeft: "10px" }}
      className={styles.logo}
      href="/"
      title="Inicio"
    >
      El Villanense
    </Link>
  );
}
