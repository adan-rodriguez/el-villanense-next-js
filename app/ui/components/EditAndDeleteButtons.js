"use client";

import styles from "../styles/EditAndDeleteButtons.module.css";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth";

export default function EditAndDeleteButtons({ articleId }) {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className={styles.container}>
      <EditButton articleId={articleId} />
      <DeleteButton articleId={articleId} />
    </div>
  );
}
