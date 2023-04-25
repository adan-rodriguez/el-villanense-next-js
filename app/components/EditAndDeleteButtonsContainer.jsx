"use client";

import useLogin from "../hooks/useLogin";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function EditAndDeleteButtonsContainer({
  articleId,
  section,
  style,
}) {
  const { user } = useLogin();

  if (!user) return null;

  return (
    <div style={style}>
      <EditButton articleId={articleId} />
      <DeleteButton articleId={articleId} section={section} />
    </div>
  );
}
