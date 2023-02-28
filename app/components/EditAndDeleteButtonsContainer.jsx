"use client";

import useLogin from "../hooks/useLogin";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function EditAndDeleteButtonsContainer({
  articleId,
  section,
  style,
}) {
  const { isUserLogged } = useLogin();

  console.log(`home ${isUserLogged}`);

  if (!isUserLogged) return null;

  return (
    <div style={style}>
      <EditButton articleId={articleId} />
      <DeleteButton articleId={articleId} section={section} />
    </div>
  );
}
