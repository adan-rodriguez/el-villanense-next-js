import { usePathname, useRouter } from "next/navigation";
import { DOMAIN } from "../utils/constants/domain";
import { deleteArticle } from "../utils/deleteArticle";

export default function DeleteButton({ children, articleId, section }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      onClick={async () => {
        if (confirm("¿Estás seguro de borrar esta noticia?")) {
          try {
            await deleteArticle(articleId);
          } catch {
            return alert("No se ha podido eliminar la noticia");
          }

          // await fetch(
          //   `${DOMAIN}/api/revalidateDelete?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`,
          //   {
          //     method: "POST",
          //     body: JSON.stringify({ articleId, section }),
          //   }
          // );

          alert("Noticia eliminada con éxito");

          articleId ? router.push("/") : router.refresh();
        }
      }}
      title="Borrar noticia"
      aria-label="Borrar noticia"
    >
      {children}
    </button>
  );
}
