"use client";

import useLogin from "@/app/hooks/useLogin";
import styles from "@/app/styles/NewArticle.module.css";
import DashboardForm from "@/app/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";

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
      />
    </>
  );
}
