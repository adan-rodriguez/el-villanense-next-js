"use client";

import Link from "next/link";
import styles from "@/app/ui/styles/DashboardHomePage.module.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { SUPER_ADMINS } from "../lib/utils";

export default function DashboardHomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.links_container}>
      <Link className="btn" href="/dashboard/nuevo">
        Nuevo artículo
      </Link>
      <Link className="btn" href="/dashboard/articulos">
        Editar/Borrar
      </Link>
      <Link className="btn" href={`/autor/${user.nick}`}>
        Tus noticias
      </Link>
      {/* <Link className="btn" href="/dashboard/borradores">
        Borradores
      </Link> */}
      {SUPER_ADMINS.includes(user.email) && (
        <Link className="btn" href="/dashboard/signup">
          Agregar usuario
        </Link>
      )}
    </div>
  );
}
