"use client";

import Link from "next/link";
import styles from "@/app/ui/styles/DashboardHome.module.css";
import { routes } from "../lib/routes";
import useAuth from "../hooks/useAuth";

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className={styles.links_container}>
      <Link className={styles.link} href={routes.dashboard.new.root}>
        Nuevo artículo
      </Link>
      <Link className={styles.link} href={routes.dashboard.articles.root}>
        Editar/Borrar
      </Link>
      <Link
        className={styles.link}
        href={routes.authors.root + `/${user.nick}`}
      >
        Tus noticias
      </Link>
    </div>
  );
}
