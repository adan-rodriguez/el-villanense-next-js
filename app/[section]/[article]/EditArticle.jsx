"use client";

import { loginContext } from "@/app/layout";
import Link from "next/link";
import { useContext } from "react";

export default function EditArticle({ articleId }) {
  const isUserLogged = useContext(loginContext);

  if (!isUserLogged) return null;

  return (
    <Link href={`/edit/${articleId}`} title="Editar noticia">
      <img src="/icons/admin/edit.svg" alt="Editar" width={30} height={30} />
    </Link>
  );
}
