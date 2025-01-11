import { cookies } from "next/headers";
import { LoginForm } from "../ui/components/LoginForm";
import { redirect } from "next/navigation";
import { auth } from "../lib/firebase/server";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) return <LoginForm />;

  try {
    await auth.verifySessionCookie(sessionCookie, true);
    redirect("/dashboard");
  } catch (error) {
    console.log(error);
    cookieStore.delete("__session");
    return <LoginForm />;
  }
}
