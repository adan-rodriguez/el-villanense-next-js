"use client";

import DashboardForm from "@/app/ui/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";
import styles from "@/app/ui/styles/EditArticle.module.css";

export default function DashboardEditArticle({ articleId, article }) {
  const articleAndSetters = useDashboardForm(article);

  return (
    <>
      <h2 className={styles.title}>Editar artículo</h2>
      <DashboardForm article={articleAndSetters} articleId={articleId} />
    </>
  );
}
