import { useRouter } from "next/navigation";
import { routes } from "../../lib/routes";
import Image from "next/image";

export default function EditButton({ articleId, width = 30, height = 30 }) {
  const router = useRouter();
  return (
    <button
      onClick={() =>
        router.push(`${routes.dashboard.edit.root}?articulo=${articleId}`)
      }
      title="Editar noticia"
      aria-label="Editar noticia"
    >
      <Image
        src="/icons/dashboard/edit.svg"
        alt="Editar"
        width={width}
        height={height}
      />
    </button>
  );
}
