import { cookies } from "next/headers";
import { ArticlesDashboardClientPage } from "./page.client";
import { auth } from "@/app/lib/firebase/server";
import { redirect } from "next/navigation";
import { Role } from "@/app/lib/types";

export default async function ArticlesDashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let id;
  try {
    const { uid } = await auth.verifySessionCookie(sessionCookie);
    id = uid;
  } catch (error) {
    console.error(error);
    cookieStore.delete("__session");
    redirect("/login");
  }

  const user = await auth.getUser(id);
  const role: Role = user.customClaims?.role ?? "editor";

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
