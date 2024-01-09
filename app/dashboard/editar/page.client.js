"use client";

import DashboardForm from "@/app/ui/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";
import styles from "@/app/ui/styles/EditArticleClientPage.module.css";
import useAuth from "@/app/hooks/useAuth";

export default function EditArticleClientPage({ articleId, article }) {
  const {
    title,
    image,
    altImage,
    lead,
    section,
    content,
    isThereAuthor,
    getTitle,
    getImage,
    getAltImage,
    getLead,
    getSection,
    getContent,
    getIsThereAuthor,
    imageFile,
    getImageFile,
  } = useDashboardForm({ article });

  const { user } = useAuth();

  return (
    <>
      <h2 className={styles.title}>Editar artículo</h2>
      <DashboardForm
        {...{
          title,
          image,
          altImage,
          lead,
          section,
          content,
          isThereAuthor,
          getTitle,
          getImage,
          getAltImage,
          getLead,
          getSection,
          getContent,
          getIsThereAuthor,
          imageFile,
          getImageFile,
          user,
          articleId,
        }}
      />
    </>
  );
}
