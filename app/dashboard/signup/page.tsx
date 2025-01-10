import { auth } from "@/app/lib/firebase/server";
import { getAuthor } from "@/app/lib/services/authors";
import { SignupForm } from "@/app/ui/components/SignupForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignupPage() {
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

  if (user.customClaims?.role !== "superadmin") redirect("/dashboard");

  return <SignupForm />;
}
