import Image from "next/image";
import Link from "next/link";

export default function EditButton({ articleId }) {
  return (
    <Link
      href={`/dashboard/editar-articulo/${articleId}`}
      title="Editar noticia"
      style={{
        height: "30px",
      }}
    >
      <Image
        src="/icons/dashboard/edit.svg"
        alt="Editar"
        width={30}
        height={30}
      />
    </Link>
  );
}
