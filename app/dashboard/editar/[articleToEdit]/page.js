"use client";

import DashboardForm from "@/app/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";
import styles from "@/app/styles/EditArticle.module.css";

export default function EditArticle({ params }) {
  const { articleToEdit } = params;
  const { article, settersArticle } = useDashboardForm(articleToEdit);

  return (
    <>
      <h2 className={styles.title}>Editar artículo</h2>
      <DashboardForm
        article={article}
        settersArticle={settersArticle}
        articleToEdit={articleToEdit}
      />
    </>
  );
}
