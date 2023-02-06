"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteArticle } from "../utils/deleteArticle";

export default function DeleteButton({ articleId, section }) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await deleteArticle(articleId, section);
        router.push("/");
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
