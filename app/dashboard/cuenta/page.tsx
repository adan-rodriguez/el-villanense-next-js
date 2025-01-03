import { auth } from "@/app/lib/firebase/server";
import { AuthorImage } from "@/app/ui/components/AuthorImage";
import styles from "@/app/ui/styles/AccountPage.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UpdateUserForm } from "./UpdateUserForm";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let decodedIdToken;
  try {
    decodedIdToken = await auth.verifySessionCookie(sessionCookie);
  } catch (error) {
    redirect("/login");
  }

  const { uid, name, email, phone_number, picture } = decodedIdToken;

  return (
    <div className={styles.container}>
      <div className={styles.data_container}>
        <p>{name}</p>
        <AuthorImage image={picture} name={name} width={60} height={60} />
        <p>{email}</p>
        <p>{phone_number}</p>
      </div>
      <UpdateUserForm
        uid={uid}
        name={name}
        email={email}
        phone_number={phone_number}
        picture={picture}
      />
    </div>
  );
}
