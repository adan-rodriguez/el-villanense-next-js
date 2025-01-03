import { auth } from "@/app/lib/firebase/server";
import { getAuthor } from "@/app/lib/services/authors";
import { SignupForm } from "@/app/ui/components/SignupForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let decodedIdToken;

  try {
    decodedIdToken = await auth.verifySessionCookie(sessionCookie);
  } catch (error) {
    redirect("/login");
  }

  let isSuperAdmin;
  try {
    const { superAdmin } = await getAuthor(decodedIdToken.uid);
    isSuperAdmin = superAdmin;
  } catch (error) {
    return <p>Ocurrió un error. Intenta nuevamente más tarde.</p>;
  }

  if (!isSuperAdmin) redirect("/dashboard");

  return <SignupForm />;
}
