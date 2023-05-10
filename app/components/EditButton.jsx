import { useRouter } from "next/navigation";
import styles from "../styles/EditAndDeleteButtonsContainer.module.css";

export default function EditButton({ children, articleId }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/dashboard/editar-articulo/${articleId}`)}
      title="Editar noticia"
      aria-label="Editar noticia"
      className={styles.button}
    >
      {children}
    </button>
  );
}
