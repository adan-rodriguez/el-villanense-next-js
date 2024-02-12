import { useRouter } from "next/navigation";

export default function EditButton({ articleId, width = 30, height = 30 }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/dashboard/editar?articulo=${articleId}`)}
      title="Editar noticia"
      aria-label="Editar noticia"
    >
      <img
        src="/icons/dashboard/edit.svg"
        alt="Icono de editar"
        width={width}
        height={height}
        loading="lazy"
      />
    </button>
  );
}
