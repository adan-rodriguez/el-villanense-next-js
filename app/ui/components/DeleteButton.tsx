"use client";

export function DeleteButton({ id }: { id: string }) {
  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    if (confirm("¿Estás seguro de borrar esta noticia?")) {
      const response = await fetch(`/api/article/${id}`, {
        method: "DELETE",
      });

      if (response.status !== 204) {
        alert("No se ha podido eliminar la noticia");
        return;
      }

      alert("Noticia eliminada con éxito");
      e.currentTarget.closest("article")?.remove();
    }
  }

  return (
    <button onClick={handleDelete} title="Borrar noticia">
      <img
        src="/icons/dashboard/delete.svg"
        alt="Icono de borrar"
        width={30}
        height={30}
      />
    </button>
  );
}
