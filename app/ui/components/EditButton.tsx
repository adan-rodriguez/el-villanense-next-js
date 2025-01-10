import Link from "next/link";

export function EditButton({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/editar?id=${id}`} title="Editar noticia">
      <img
        src="/icons/dashboard/edit.svg"
        alt="Icono de editar"
        width={30}
        height={30}
      />
    </Link>
  );
}
