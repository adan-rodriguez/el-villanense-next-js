import { useRouter } from "next/navigation";
import { routes } from "../../lib/routes";

export default function EditButton({ children, articleId }) {
  const router = useRouter();
  return (
    <button
      onClick={() =>
        router.push(`${routes.dashboard.edit.root}?articulo=${articleId}`)
      }
      title="Editar noticia"
      aria-label="Editar noticia"
    >
      {children}
    </button>
  );
}
