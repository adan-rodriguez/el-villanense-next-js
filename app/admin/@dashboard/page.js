"use client";

import Link from "next/link";
import styles from "@/app/styles/DashboardHome.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Link className={styles.links} href="/admin/nuevo">
        Nuevo artículo
      </Link>
      <Link className={styles.links} href="/admin/articulos">
        Editar/Borrar
      </Link>
    </div>
  );
}
