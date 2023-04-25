"use client";

import Image from "next/image";
import useLogin from "../hooks/useLogin";
import { DOMAIN } from "../utils/constants/domain";

export default function RevalidateButton() {
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
      <Image
        src="/icons/dashboard/refresh.svg"
        alt="Actualizar"
        width={30}
        height={30}
      />
    </button>
  );
}
