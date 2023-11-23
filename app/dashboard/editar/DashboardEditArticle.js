"use client";

import DashboardForm from "@/app/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";
import styles from "@/app/styles/EditArticle.module.css";

export default function DashboardEditArticle({ articleId }) {
  const article = useDashboardForm(articleId);

  return (
    <>
      <h2 className={styles.title}>Editar artículo</h2>
      <DashboardForm article={article} articleId={articleId} />
    </>
  );
}
