import { cookies } from "next/headers";
import LoginForm from "../ui/components/LoginForm";
import { redirect } from "next/navigation";
import { auth } from "../lib/firebase/server";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (sessionCookie) {
    try {
      const decodedIdToken = await auth.verifySessionCookie(sessionCookie);
      console.log("Token válido", decodedIdToken);
      redirect("/dashboard");
    } catch (error) {
      console.error({ error });
    }
  }

  return <LoginForm />;
}
