import Link from "next/link";
import styles from "@/app/ui/styles/NotFoundPage.module.css";

export default function GlobalNotFound() {
  return (
    <div className={styles.container}>
      <h2>Página no encontrada</h2>
      <Link className={styles.link_home} href="/">
        Ir al inicio
      </Link>
    </div>
  );
}
