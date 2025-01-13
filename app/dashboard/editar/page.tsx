import { notFound, redirect } from "next/navigation";
import { EditArticleClientPage } from "./page.client";
import { cookies } from "next/headers";
import { auth } from "@/app/lib/firebase/server";
import { deleteCookie } from "@/app/lib/server-actions";
import { getAuthor } from "@/app/lib/services/authors";
import { Article, Role } from "@/app/lib/types";

export default async function EditArticlePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let uid;
  let role: Role;
  try {
    const decodedIdToken = await auth.verifySessionCookie(sessionCookie, true);
    role = decodedIdToken.role;
    uid = decodedIdToken.uid;
  } catch (error) {
    console.error(error);
    await deleteCookie("__session");
    redirect("/login");
  }

  let author;
  try {
    author = await getAuthor(uid);
  } catch (error) {
    console.error(error);
    return <p>Ocurrió un error. Intenta nuevamente más tarde.</p>;
  }

  const { id } = await searchParams;

  if (typeof id !== "string") notFound();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article/${id}`
  );

  if (response.status === 404) notFound();

  if (!response.ok) {
    return <p>Ocurrió un error. Intenta nuevamente más tarde.</p>;
  }

  const article: Article = await response.json();

  if (!article.authorsIds.includes(author.id) && role === "editor") notFound();

  return (
    <EditArticleClientPage article={article} userId={author.id} role={role} />
  );
}
