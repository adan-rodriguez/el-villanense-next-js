import { auth } from "@/app/lib/firebase/server";
import { AuthorImage } from "@/app/ui/components/AuthorImage";
import styles from "@/app/ui/styles/AccountPage.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let id;
  try {
    const { uid } = await auth.verifySessionCookie(sessionCookie);
    id = uid;
  } catch (error) {
    console.log(error);
    cookieStore.delete("__session");
    redirect("/login");
  }

  const user = await auth.getUser(id);

  const { displayName, email, phoneNumber, photoURL } = user;

  return (
    <div className={styles.container}>
      <div className={styles.data_container}>
        <p>{displayName}</p>
        <AuthorImage
          image={photoURL}
          name={displayName}
          width={60}
          height={60}
        />
        {email && <p>{email}</p>}
        {phoneNumber && <p>{phoneNumber}</p>}
      </div>
    </div>
  );
}
