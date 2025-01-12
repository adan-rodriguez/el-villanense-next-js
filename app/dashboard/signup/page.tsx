import { auth } from "@/app/lib/firebase/server";
import { deleteCookie } from "@/app/lib/server-actions";
import { Role } from "@/app/lib/types";
import { SignupForm } from "./SignupForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let role: Role;
  try {
    const decodedIdToken = await auth.verifySessionCookie(sessionCookie, true);
    role = decodedIdToken.role;
  } catch (error) {
    console.error(error);
    await deleteCookie("__session");
    redirect("/login");
  }

  if (role !== "superadmin") redirect("/dashboard");

  return <SignupForm />;
}
