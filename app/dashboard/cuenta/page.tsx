import { auth } from "@/app/lib/firebase/server";
import { deleteCookie } from "@/app/lib/server-actions";
import { AuthorImage } from "@/app/ui/components/AuthorImage";
import styles from "@/app/ui/styles/AccountPage.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let user;
  try {
    const { email, picture, phone_number, name } =
      await auth.verifySessionCookie(sessionCookie, true);
    user = {
      name,
      email,
      picture,
      phone_number,
    };
  } catch (error) {
    console.log(error);
    await deleteCookie("__session");
    redirect("/login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.data_container}>
        <p>{user.name && "Nombre no proporcionado"}</p>
        <AuthorImage
          image={user.picture}
          name={user.name}
          width={60}
          height={60}
        />
        {user.email && <p>{user.email}</p>}
        {user.phone_number && <p>{user.phone_number}</p>}
      </div>
    </div>
  );
}
