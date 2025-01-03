import { cookies } from "next/headers";
import { ArticlesDashboardClientPage } from "./page.client";
import { auth } from "@/app/lib/firebase/server";
import { redirect } from "next/navigation";
import { getAuthor } from "@/app/lib/services/authors";

export default async function ArticlesDashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) {
    redirect("/login");
  }

  let id;
  try {
    const { uid } = await auth.verifySessionCookie(sessionCookie);
    id = uid;
  } catch (error) {
    redirect("/login");
  }

  let nick;
  try {
    const author = await getAuthor(id);
    nick = author.nick;
  } catch (error) {
    return <p>Ocurrió un error. Intenta nuevamente más tarde.</p>;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${nick}`
  );

  if (!response.ok) {
    return <p>Ocurrió un error. Intenta nuevamente más tarde.</p>;
  }

  const articles = await response.json();

  return <ArticlesDashboardClientPage articles={articles} />;
}
