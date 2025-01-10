import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../lib/firebase/server";
import Link from "next/link";
import {
  EraserIcon,
  HomeIcon,
  PencilPlusIcon,
  UserIcon,
  UserPlusIcon,
  UsersIcon,
} from "../ui/components/Icons";
import { LogoutButton } from "./LogoutButton";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let id;
  try {
    const decodedIdToken = await auth.verifySessionCookie(sessionCookie);
    id = decodedIdToken.uid;
  } catch (error) {
    console.error(error);
    cookieStore.delete("__session");
    redirect("/login");
  }

  const user = await auth.getUser(id);

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <Link
          className="btn"
          style={{ display: "flex", padding: "5px" }}
          href="/dashboard"
          title="Inicio"
        >
          <HomeIcon />
        </Link>
        <Link
          className="btn"
          style={{ display: "flex", padding: "5px" }}
          href="/dashboard/nuevo"
          title="Redactar noticia"
        >
          <PencilPlusIcon />
        </Link>
        <Link
          className="btn"
          style={{ display: "flex", padding: "5px" }}
          href="/dashboard/articulos"
          title="Editar/Borrar noticia"
        >
          <EraserIcon />
        </Link>
        <Link
          className="btn"
          style={{ display: "flex", padding: "5px" }}
          href="/dashboard/cuenta"
          title="Perfil"
        >
          <UserIcon />
        </Link>
        {user.customClaims?.role === "superadmin" && (
          <>
            <Link
              className="btn"
              style={{ display: "flex", padding: "5px" }}
              href="/dashboard/signup"
              title="Crear usuario"
            >
              <UserPlusIcon />
            </Link>
            <Link
              className="btn"
              style={{ display: "flex", padding: "5px" }}
              href="/dashboard/usuarios"
              title="Todos los usuarios"
            >
              <UsersIcon />
            </Link>
          </>
        )}
        <LogoutButton />
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
