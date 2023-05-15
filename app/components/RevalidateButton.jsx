"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import useLogin from "../hooks/useLogin";
import { DOMAIN } from "../utils/constants/domain";
import styles from "@/app/styles/RevalidateButton.module.css";

export default function RevalidateButton({ children }) {
  const { user } = useLogin();
  const segments = useSelectedLayoutSegments();
  const isInAdmin = segments[0] === "admin";

  if (!user || isInAdmin) return null;

  return (
    <button
      className={styles.button}
      onClick={async () => {
        if (confirm("¿Estás seguro que deseas revalidar ésta página?")) {
          const res = await fetch(`${DOMAIN}/api/revalidate`);
          const data = await res.json();
          console.log(data);

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
