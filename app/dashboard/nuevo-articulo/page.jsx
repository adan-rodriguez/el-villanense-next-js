"use client";

import useDashboardForm from "../../hooks/useDashboardForm";
import { addArticle } from "../../utils/addArticle";
import DashboardForm from "../../components/DashboardForm";
import { DOMAIN } from "@/app/utils/constants/domain";
import useLogin from "@/app/hooks/useLogin";

export default function NewArticle() {
  const { article, settersArticle } = useDashboardForm();
  const { user } = useLogin();

  return (
    <>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Nuevo artículo
      </h2>
      <DashboardForm
        user={user}
        article={article}
        settersArticle={settersArticle}
        isEditing={false}
        handleSubmit={async () => {
          try {
            await addArticle(article);
          } catch {
            return alert("No se ha podido subir la noticia");
          }

          await fetch(
            `${DOMAIN}/api/revalidateUploadAndEdit?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`,
            { method: "POST", body: article.section }
          );

          alert("Artículo subido con éxito");
        }}
      />
    </>
  );
}
