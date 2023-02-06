"use client";

import { loginContext } from "@/app/layout";
import { useContext } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function EditAndDeleteButtonsContainer({
  articleId,
  section,
  style,
}) {
  const isUserLogged = useContext(loginContext);

  if (!isUserLogged) return null;

  return (
    <div style={style}>
      <EditButton articleId={articleId} />
      <DeleteButton articleId={articleId} section={section} />
    </div>
  );
}
