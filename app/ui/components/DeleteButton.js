import Image from "next/image";
import { handleDelete } from "../../lib/utils";

export default function DeleteButton({ articleId }) {
  return (
    <button
      onClick={() => handleDelete({ articleId })}
      title="Borrar noticia"
      aria-label="Borrar noticia"
    >
      <Image
        src="/icons/dashboard/delete.svg"
        alt="Borrar"
        width={30}
        height={30}
      />
    </button>
  );
}
