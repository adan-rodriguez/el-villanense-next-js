import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Página no encontrada</h2>
      <Link
        style={{
          textTransform: "uppercase",
          fontSize: "12px",
          color: "#0289cb",
          textDecorationLine: "underline",
        }}
        href="/"
      >
        Ir al inicio
      </Link>
    </div>
  );
}
