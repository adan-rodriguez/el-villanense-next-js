"use client";

import useLogin from "@/app/hooks/useLogin";
import styles from "@/app/ui/styles/NewArticle.module.css";
import DashboardForm from "@/app/ui/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";

export default function NewArticle() {
  const article = useDashboardForm();
  const { user } = useLogin();

  return (
    <>
      <h2 className={styles.title}>Nuevo artículo</h2>
      <DashboardForm article={article} user={user} />
    </>
  );
}
