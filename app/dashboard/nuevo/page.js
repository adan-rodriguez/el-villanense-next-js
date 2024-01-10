"use client";

import styles from "@/app/ui/styles/NewArticlePage.module.css";
import DashboardForm from "@/app/ui/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth";

export default function NewArticlePage() {
  const {
    title,
    image,
    altImage,
    lead,
    section,
    content,
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
  } = useDashboardForm();

  const { user } = useContext(AuthContext);

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
        }}
      />
    </>
  );
}
