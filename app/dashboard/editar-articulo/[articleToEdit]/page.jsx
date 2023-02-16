"use client";

import DashboardForm from "@/app/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";
import { loginContext } from "@/app/layout";
import { DOMAIN } from "@/app/utils/constants/domain";
import { editArticle } from "@/app/utils/editArticle";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function EditArticle({ params }) {
  const { articleToEdit } = params;

  const isUserLogged = useContext(loginContext);

  const { article, settersArticle } = useDashboardForm(articleToEdit);

  const router = useRouter();

  useEffect(() => {
    if (!isUserLogged) {
      router.push("/login");
    }
  }, [isUserLogged]);

  return (
    <>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Editar artículo
      </h2>
      <DashboardForm
        article={article}
        settersArticle={settersArticle}
        isEditing
        handleSubmit={async () => {
          try {
            await editArticle(articleToEdit, article);
          } catch {
            return alert("No se ha podido editar la noticia");
          }

          await fetch(
            `${DOMAIN}/api/revalidateUploadAndEdit?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`,
            {
              method: "POST",
              body: `${article.section}/${articleToEdit}`,
            }
          );

          alert("Artículo editado con éxito");
        }}
      />
    </>
  );
}
