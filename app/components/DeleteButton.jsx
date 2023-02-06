"use client";

import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "../firebase/firebase";
import { DOMAIN } from "../utils/constants/domain";

export default function DeleteButton({ articleId, section }) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        if (confirm("¿Estás seguro de borrar esta noticia?")) {
          await deleteDoc(doc(db, "articles", articleId));
          await fetch(
            `${DOMAIN}/api/revalidate?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`,
            {
              method: "POST",
              body: section,
            }
          );
          router.push("/");
        }
      }}
      title="Borrar noticia"
      style={{ backgroundColor: "transparent", border: "none", height: "30px" }}
    >
      <img src="/icons/admin/delete.svg" alt="Borrar" width={30} height={30} />
    </button>
  );
}
