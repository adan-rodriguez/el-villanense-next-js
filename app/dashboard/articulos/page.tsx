import { cookies } from "next/headers";
import { ArticlesDashboardClientPage } from "./page.client";
import { auth } from "@/app/lib/firebase/server";
import { redirect } from "next/navigation";
import { Role } from "@/app/lib/types";
import { deleteCookie } from "@/app/lib/server-actions";

export default async function ArticlesDashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let role: Role;
  let id;
  try {
    const decodedIdToken = await auth.verifySessionCookie(sessionCookie, true);
    role = decodedIdToken.role;
    id = decodedIdToken.uid;
  } catch (error) {
    console.error(error);
    await deleteCookie("__session");
    redirect("/login");
  }

  let response;
  if (role === "superadmin") {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  } else {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`);
  }

  if (!response.ok) {
    return <p>Ocurrió un error. Intenta nuevamente más tarde.</p>;
  }

  const articles = await response.json();

  return <ArticlesDashboardClientPage articles={articles} />;
}
