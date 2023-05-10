"use client";

import useLogin from "../hooks/useLogin";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import styles from "../styles/EditAndDeleteButtonsContainer.module.css";
import Image from "next/image";

export default function EditAndDeleteButtonsContainer({
  articleId,
  section,
  style,
}) {
  const { user } = useLogin();

  if (!user) return null;

  return (
    <div className={styles.container} style={style}>
      <EditButton articleId={articleId}>
        <Image
          src="/icons/dashboard/edit.svg"
          alt="Editar"
          width={30}
          height={30}
        />
      </EditButton>
      <DeleteButton articleId={articleId} section={section}>
        <Image
          src="/icons/dashboard/delete.svg"
          alt="Borrar"
          width={30}
          height={30}
        />
      </DeleteButton>
    </div>
  );
}
