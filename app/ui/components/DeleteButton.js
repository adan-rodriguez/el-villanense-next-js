"use client";

import Image from "next/image";
import { handleDelete } from "../../lib/utils";

export default function DeleteButton({ articleId, width = 30, height = 30 }) {
  return (
    <button
      onClick={() => handleDelete({ articleId })}
      title="Borrar noticia"
      aria-label="Borrar noticia"
    >
      <Image
        src="/icons/dashboard/delete.svg"
        alt="Borrar"
        width={width}
        height={height}
      />
    </button>
  );
}
