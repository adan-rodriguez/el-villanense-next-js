"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import useLogin from "../hooks/useLogin";
import { DOMAIN } from "../utils/constants/domain";

export default function RevalidateButton({ children }) {
  const { user } = useLogin();
  const segments = useSelectedLayoutSegments();
  const isInAdmin = segments[0] === "admin";

  if (!user || isInAdmin) return null;

  return (
    <button
      style={{ position: "absolute" }}
      onClick={async () => {
        if (confirm("¿Estás seguro que deseas revalidar ésta página?")) {
          // await fetch(
          //   `${DOMAIN}/api/revalidateHome?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`
          // );
          const res = await fetch(`${DOMAIN}/api/revalidate`);
          console.log(res);

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
