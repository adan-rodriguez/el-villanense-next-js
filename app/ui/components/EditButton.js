import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditButton({ articleId, width = 30, height = 30 }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/dashboard/editar?articulo=${articleId}`)}
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
