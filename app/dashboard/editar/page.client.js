"use client";

import DashboardForm from "@/app/ui/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";
import styles from "@/app/ui/styles/EditArticleClientPage.module.css";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth";

export default function EditArticleClientPage({ articleId, article }) {
  const {
    title,
    image,
    altImage,
    lead,
    section,
    content,
    author,
    showAuthor,
    getTitle,
    getImage,
    getAltImage,
    getLead,
    getSection,
    getContent,
    getShowAuthor,
    imageFile,
    getImageFile,
  } = useDashboardForm({ article });

  const { user } = useContext(AuthContext);

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
          showAuthor,
          getTitle,
          getImage,
          getAltImage,
          getLead,
          getSection,
          getContent,
          getShowAuthor,
          imageFile,
          getImageFile,
          user,
          articleId,
        }}
      />
    </>
  );
}
