"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import useLogin from "../../hooks/useLogin";
import styles from "@/app/styles/RevalidateButton.module.css";
import { DOMAIN } from "../../lib/constants";
import { routes } from "@/app/lib/routes";

export default function RevalidateButton({ children }) {
  const { user } = useLogin();
  const segments = useSelectedLayoutSegments();
  const isInAdmin = segments[0] === "dashboard" || segments[0] === "login";

  if (!user || isInAdmin) return null;

  return (
    <button
      className={styles.button}
      onClick={async () => {
        if (confirm("¿Estás seguro que deseas revalidar ésta página?")) {
          await fetch(`${DOMAIN + routes.routes.revalidate.root}`);
          alert("Página actualizada. Refresque para ver los cambios");
        }
      }}
      title="Revalidar página"
      aria-label="Revalidar página"
    >
      {children}
    </button>
  );
}
