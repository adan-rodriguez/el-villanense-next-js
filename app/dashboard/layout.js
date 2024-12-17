import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../lib/firebase/server";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const decodedIdToken = await auth.verifySessionCookie(sessionCookie);
    console.log("Token válido", decodedIdToken);
  } catch (error) {
    console.error({ error });
    redirect("/login");
  }

  return children;
}
