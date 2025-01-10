import { auth } from "@/app/lib/firebase/server";
import { Role } from "@/app/lib/types";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function UsersPage() {
  const cookiesStore = await cookies();
  const sessionCookie = cookiesStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let id;
  try {
    const decodedIdToken = await auth.verifySessionCookie(sessionCookie, true);
    id = decodedIdToken.uid;
  } catch (error) {
    console.error(error);
    cookiesStore.delete("__session");
    redirect("/login");
  }

  const user = await auth.getUser(id);
  const role: Role = user.customClaims?.role ?? "editor";

  if (role !== "superadmin") redirect("/dashboard");

  let users;
  try {
    const listUsersResult = await auth.listUsers();
    users = listUsersResult.users.map((user) => {
      const { uid, displayName, email, photoURL, phoneNumber, customClaims } =
        user;
      return {
        id: uid,
        name: displayName,
        email,
        image: photoURL,
        phone: phoneNumber,
        role: (customClaims?.role as Role) ?? "editor",
      };
    });
  } catch (error) {
    console.error("Error listing users:", error);
  }

  return (
    <div>
      {users?.map((user) => (
        <Fragment key={user.id}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img
              src={
                user.image ??
                "https://res.cloudinary.com/dh4eh6jen/image/upload/v1703888334/el-villanense-redactores/person-icon_itua0j.webp"
              }
              alt={
                user.image
                  ? `Foto de ${user.name ?? "usuario"}`
                  : "Icono de persona"
              }
              width={100}
              height={100}
              style={{
                backgroundColor: "black",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
            <div>
              <p>Nombre: {user.name ?? "No proporcionado"}</p>
              <p>Email: {user.email ?? "No proporcionado"}</p>
              <p>Teléfono: {user.phone ?? "No proporcionado"}</p>
              <p>Rol: {user.role}</p>
              <Link href={`/dashboard/usuarios/${user.id}`}>Editar</Link>
            </div>
          </div>
          <hr style={{ marginBlock: "0.5rem" }} />
        </Fragment>
      ))}
    </div>
  );
}
