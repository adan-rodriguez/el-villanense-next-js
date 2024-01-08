import Link from "next/link";
import styles from "@/app/ui/styles/DashboardHome.module.css";
import { routes } from "../lib/routes";

export default function DashboardHome() {
  return (
    <div className={styles.container}>
      <Link className={styles.links} href={routes.dashboard.new.root}>
        Nuevo artículo
      </Link>
      <Link className={styles.links} href={routes.dashboard.articles.root}>
        Editar/Borrar
      </Link>
    </div>
  );
}
