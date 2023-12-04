import { useRouter } from "next/navigation";
import { handleDelete } from "../../lib/utils";

export default function DeleteButton({ children, articleId }) {
  const router = useRouter();

  return (
    <button
      onClick={() => handleDelete({ articleId, router })}
      title="Borrar noticia"
      aria-label="Borrar noticia"
    >
      {children}
    </button>
  );
}
