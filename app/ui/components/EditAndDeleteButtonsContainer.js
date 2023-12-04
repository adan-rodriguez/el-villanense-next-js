"use client";

import styles from "../styles/EditAndDeleteButtonsContainer.module.css";
import useLogin from "../../hooks/useLogin";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import Image from "next/image";

export default function EditAndDeleteButtonsContainer({
  articleId,
  positionAbsolute,
}) {
  const { user } = useLogin();

  if (!user) return null;

  return (
    <div className={styles.container} style={positionAbsolute}>
      <EditButton articleId={articleId}>
        <Image
          src="/icons/dashboard/edit.svg"
          alt="Editar"
          width={30}
          height={30}
        />
      </EditButton>
      <DeleteButton articleId={articleId}>
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
