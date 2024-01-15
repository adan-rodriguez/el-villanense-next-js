"use client";

import Link from "next/link";
import styles from "@/app/ui/styles/DashboardHomePage.module.css";
import { routes } from "../lib/routes";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { SUPER_ADMINS } from "../lib/utils";

export default function DashboardHomePage() {
  const { user } = useContext(AuthContext);

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
      {SUPER_ADMINS.includes(user.email) && (
        <Link className={styles.link} href={routes.dashboard.signup.root}>
          Agregar usuario
        </Link>
      )}
    </div>
  );
}
