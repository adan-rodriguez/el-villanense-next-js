"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteArticle } from "../utils/deleteArticle";

export default function DeleteButton({ articleId, section }) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        if (confirm("¿Estás seguro de borrar esta noticia?")) {
          await deleteArticle(articleId, section);
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
