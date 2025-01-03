"use client";

import Link from "next/link";
import styles from "@/app/ui/styles/DashboardHomePage.module.css";

export function DashboardClientHomePage({
  isSuperAdmin,
}: {
  isSuperAdmin?: boolean;
}) {
  return (
    <div className={styles.links_container}>
      <Link className="btn" href="/dashboard/nuevo">
        Nuevo artículo
      </Link>
      <Link className="btn" href="/dashboard/articulos">
        Editar/Borrar
      </Link>
      {/* <Link className="btn" href="/dashboard/borradores">
        Borradores
      </Link> */}
      {isSuperAdmin && (
        <Link className="btn" href="/dashboard/signup">
          Agregar usuario
        </Link>
      )}
    </div>
  );
}
