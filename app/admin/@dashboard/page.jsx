"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: "20px",
        paddingTop: "20px",
      }}
    >
      <Link
        style={{
          border: "1px solid black",
          width: "200px",
          textAlign: "center",
          padding: "10px 0",
        }}
        href="/admin/nuevo"
      >
        Nuevo artículo
      </Link>
      <Link
        style={{
          border: "1px solid black",
          width: "200px",
          textAlign: "center",
          padding: "10px 0",
        }}
        href="/admin/articulos"
      >
        Editar/Borrar
      </Link>
    </div>
  );
}
