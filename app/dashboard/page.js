import Link from "next/link";
import styles from "@/app/styles/DashboardHome.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Link className={styles.links} href="/dashboard/nuevo">
        Nuevo artículo
      </Link>
      <Link className={styles.links} href="/dashboard/articulos">
        Editar/Borrar
      </Link>
    </div>
  );
}
