import Link from "next/link";

export default function EditButton({ articleId }) {
  return (
    <Link
      href={`/edit/${articleId}`}
      title="Editar noticia"
      style={{
        height: "30px",
      }}
    >
      <img src="/icons/admin/edit.svg" alt="Editar" width={30} height={30} />
    </Link>
  );
}
