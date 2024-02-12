"use client";

import { handleDelete } from "../../lib/utils";

export default function DeleteButton({
  articleId,
  nick,
  width = 30,
  height = 30,
}) {
  return (
    <button
      onClick={() => handleDelete({ articleId, nick })}
      title="Borrar noticia"
      aria-label="Borrar noticia"
    >
      <img
        src="/icons/dashboard/delete.svg"
        alt="Icono de borrar"
        width={width}
        height={height}
        loading="lazy"
      />
    </button>
  );
}
