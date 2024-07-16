"use client";

import styles from "../styles/EditAndDeleteButtons.module.css";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth";

export default function EditAndDeleteButtons({ articleId, nick, ...props }) {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className={styles.container} {...props}>
      <EditButton articleId={articleId} />
      <DeleteButton articleId={articleId} nick={nick} />
    </div>
  );
}
