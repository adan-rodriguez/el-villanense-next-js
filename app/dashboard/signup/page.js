import { auth } from "@/app/lib/firebase/server";
import { SUPER_ADMINS } from "@/app/lib/utils";
import SignupForm from "@/app/ui/components/SignupForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;
  let decodedIdToken;

  if (sessionCookie) {
    try {
      decodedIdToken = await auth.verifySessionCookie(sessionCookie);
      console.log("Token válido", decodedIdToken);
    } catch (error) {
      console.error({ error });
      redirect("/login");
    }
  }

  if (!SUPER_ADMINS.includes(decodedIdToken.email)) {
    redirect("/dashboard");
  }

  return <SignupForm />;
}
