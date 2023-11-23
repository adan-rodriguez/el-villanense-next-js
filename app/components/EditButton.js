import { useRouter } from "next/navigation";

export default function EditButton({ children, articleId }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/dashboard/editar?articulo=${articleId}`)}
      title="Editar noticia"
      aria-label="Editar noticia"
    >
      {children}
    </button>
  );
}
