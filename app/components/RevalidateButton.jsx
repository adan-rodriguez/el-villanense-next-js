"use client";

import useLogin from "../hooks/useLogin";
import { DOMAIN } from "../utils/constants/domain";

export default function RevalidateButton({ children }) {
  const { user } = useLogin();

  if (!user) return null;

  return (
    <button
      onClick={async () => {
        if (confirm("¿Estás seguro que deseas revalidar ésta página?")) {
          await fetch(
            `${DOMAIN}/api/revalidateHome?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`
          );

          alert("Página actualizada. Refresque para ver los cambios");
        }
      }}
      title="Revalidar página"
    >
      {children}
    </button>
  );
}
