"use client";

import { useRef } from "react";
import { ConfirmModal } from "./ConfirmModal";

export function DeleteButton({ id }: { id: string }) {
  const deleteArticleModalRef = useRef<HTMLDialogElement>(null);

  async function handleDelete(e: React.SyntheticEvent<HTMLDialogElement>) {
    const response = await fetch(`/api/article/${id}`, {
      method: "DELETE",
    });

    if (response.status !== 204) {
      alert("No se ha podido eliminar la noticia");
      return;
    }

    e.currentTarget.closest("article")?.remove();
    alert("Noticia eliminada con éxito");
  }

  return (
    <>
      <button
        onClick={() => deleteArticleModalRef.current?.showModal()}
        title="Borrar noticia"
      >
        <img
          src="/icons/dashboard/delete.svg"
          alt="Icono de borrar"
          width={30}
          height={30}
        />
      </button>
      <ConfirmModal
        ref={deleteArticleModalRef}
        text="¿Estás seguro deseas eliminar la noticia?"
        onClose={async (e) => {
          if (e.currentTarget.returnValue === "cancel") return;
          await handleDelete(e);
        }}
      />
    </>
  );
}
