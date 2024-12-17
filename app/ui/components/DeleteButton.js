"use client";

import { deleteAction } from "@/app/lib/server-actions";

export default function DeleteButton({ articleId, width = 30, height = 30 }) {
  async function handleDelete({ e, articleId }) {
    if (confirm("¿Estás seguro de borrar esta noticia?")) {
      try {
        await deleteAction({ articleId });
        alert("Noticia eliminada con éxito");
        e.target.closest("article").remove();
      } catch {
        alert("No se ha podido eliminar la noticia");
      }
    }
  }

  return (
    <button
      onClick={async (e) => await handleDelete({ e, articleId })}
      title="Borrar noticia"
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
