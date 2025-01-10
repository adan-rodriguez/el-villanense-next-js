"use client";

import Link from "next/link";
import styles from "@/app/ui/styles/DashboardHomePage.module.css";
import { Button } from "../ui/components/Button";
import { useLogout } from "../hooks/useLogout";

export default function DashboardHomePage() {
  const { loading, logout } = useLogout();

  return (
    <div className={styles.links_container}>
      <Link className="btn" href="/dashboard/nuevo">
        Nueva noticia
      </Link>
      <Link className="btn" href="/dashboard/articulos">
        Editar/Borrar noticias
      </Link>
      <Link className="btn" href="/dashboard/cuenta">
        Perfil
      </Link>
      <Button
        type="button"
        label="Cerrar sesión"
        onClick={logout}
        disabled={loading}
      />
    </div>
  );
}
