"use client";

import styles from "../styles/EditAndDeleteButtonsContainer.module.css";
import useAuth from "../../hooks/useAuth";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function EditAndDeleteButtonsContainer({
  articleId,
  positionAbsolute,
}) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.container} style={positionAbsolute}>
      <EditButton articleId={articleId} />
      <DeleteButton articleId={articleId} />
    </div>
  );
}
