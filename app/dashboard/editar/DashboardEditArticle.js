"use client";

import DashboardForm from "@/app/ui/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";
import styles from "@/app/ui/styles/EditArticle.module.css";

export default function DashboardEditArticle({ articleId, article }) {
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
  } = useDashboardForm({ article });

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
        }}
        articleId={articleId}
      />
    </>
  );
}
