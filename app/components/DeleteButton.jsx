"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { DOMAIN } from "../utils/constants/domain";
import { deleteArticle } from "../utils/deleteArticle";

export default function DeleteButton({ articleId, section }) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        if (confirm("¿Estás seguro de borrar esta noticia?")) {
          try {
            await deleteArticle(articleId);
          } catch {
            return alert("No se ha podido eliminar la noticia");
          }

          await fetch(
            `${DOMAIN}/api/revalidateDelete?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`,
            {
              method: "POST",
              body: { articleId, section },
            }
          );

          alert("Noticia eliminada con éxito");

          router.push("/");
        }
      }}
      title="Borrar noticia"
      style={{ backgroundColor: "transparent", border: "none", height: "30px" }}
    >
      <Image
        src="/icons/dashboard/delete.svg"
        alt="Borrar"
        width={30}
        height={30}
      />
    </button>
  );
}
