"use client";

import AdminForm from "@/app/components/AdminForm";
import useAdmin from "@/app/hooks/useAdmin";
import { loginContext } from "@/app/layout";
import { DOMAIN } from "@/app/utils/constants/domain";
import { editArticle } from "@/app/utils/editArticle";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function EditArticle({ params }) {
  const { articleToEdit } = params;
  const isUserLogged = useContext(loginContext);

  const { article, settersArticle } = useAdmin(articleToEdit);

  const router = useRouter();

  useEffect(() => {
    if (!isUserLogged) {
      router.push("/login");
    }
  }, [isUserLogged]);

  return (
    <AdminForm
      article={article}
      settersArticle={settersArticle}
      addArticle={async () => {
        await editArticle(article, articleToEdit);

        alert("Artículo editado con éxito");

        await fetch(
          // `http://localhost:3000/api/revalidate?secret=${process.env.MY_SECRET_TOKEN}`
          `${DOMAIN}/api/revalidate?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`,
          {
            method: "POST",
            body: `{${article.section}/${articleToEdit}}`,
          }
        );
      }}
    />
  );
}
