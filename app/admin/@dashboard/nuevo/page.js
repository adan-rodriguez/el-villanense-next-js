"use client";

import useLogin from "@/app/hooks/useLogin";
import styles from "@/app/styles/NewArticle.module.css";
import DashboardForm from "@/app/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";
// import { addArticle } from "@/app/utils/addArticle";
import handleSubmit from "./handleSubmit";

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
        // handleSubmit={async () => {
        //   try {
        //     await addArticle(article);
        //   } catch {
        //     return alert("No se ha podido subir la noticia");
        //   }
        //   alert("Artículo subido con éxito");
        // }}
        handleSubmit={async () => await handleSubmit(article)}
      />
    </>
  );
}
