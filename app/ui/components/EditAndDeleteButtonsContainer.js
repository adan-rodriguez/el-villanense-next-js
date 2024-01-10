"use client";

import styles from "../styles/EditAndDeleteButtonsContainer.module.css";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth";

export default function EditAndDeleteButtonsContainer({
  articleId,
  positionAbsolute,
}) {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className={styles.container} style={positionAbsolute}>
      <EditButton articleId={articleId} />
      <DeleteButton articleId={articleId} />
    </div>
  );
}
