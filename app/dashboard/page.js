"use client";

import Link from "next/link";
import styles from "@/app/ui/styles/DashboardHomePage.module.css";
import { SUPER_ADMINS } from "../lib/utils";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function DashboardHomePage() {
  const { userFirebase } = useContext(AuthContext);

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
      {SUPER_ADMINS.includes(userFirebase?.email) && (
        <Link className="btn" href="/dashboard/signup">
          Agregar usuario
        </Link>
      )}
    </div>
  );
}

// export default function DashboardHomePage() {
//   return <p>dashboard</p>;
// }
