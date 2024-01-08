"use client";

import useLogin from "@/app/hooks/useLogin";
import styles from "@/app/ui/styles/NewArticlePage.module.css";
import DashboardForm from "@/app/ui/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";

export default function NewArticlePage() {
  const {
    title,
    image,
    altImage,
    lead,
    section,
    content,
    author,
    getTitle,
    getImage,
    getAltImage,
    getLead,
    getSection,
    getContent,
    getAuthor,
    imageFile,
    getImageFile,
  } = useDashboardForm();
  const { user } = useLogin();

  return (
    <>
      <h2 className={styles.title}>Nuevo artículo</h2>
      <DashboardForm
        {...{
          title,
          image,
          altImage,
          lead,
          section,
          content,
          author,
          getTitle,
          getImage,
          getAltImage,
          getLead,
          getSection,
          getContent,
          getAuthor,
          imageFile,
          getImageFile,
          user,
        }}
      />
    </>
  );
}
