"use client";

import { DOMAIN } from "@/app/utils/constants/domain";
import useLogin from "@/app/hooks/useLogin";
import styles from "@/app/styles/NewArticle.module.css";
import DashboardForm from "@/app/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";
import { addArticle } from "@/app/utils/addArticle";

export default function NewArticle() {
  const { article, settersArticle } = useDashboardForm();
  const { user } = useLogin();

  return (
    <>
      <h2 className={styles.title}>Nuevo artículo</h2>
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
