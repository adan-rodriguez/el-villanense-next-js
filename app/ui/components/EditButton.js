import Link from "next/link";

export default function EditButton({ articleId, width = 30, height = 30 }) {
  return (
    <Link
      href={`/dashboard/editar?articulo=${articleId}`}
      title="Editar noticia"
    >
      <img
        src="/icons/dashboard/edit.svg"
        alt="Icono de editar"
        width={width}
        height={height}
        loading="lazy"
      />
    </Link>
  );
}
