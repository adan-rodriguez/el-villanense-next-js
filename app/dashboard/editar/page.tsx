import { notFound, redirect } from "next/navigation";
import { EditArticleClientPage } from "./page.client";
import { cookies } from "next/headers";
import { auth } from "@/app/lib/firebase/server";

export default async function EditArticlePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let decodedIdToken;
  try {
    decodedIdToken = await auth.verifySessionCookie(sessionCookie);
  } catch (error) {
    redirect("/login");
  }

  const { articulo: id } = await searchParams;

  if (typeof id !== "string") notFound();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article/${id}`
  );

  if (response.status === 404) notFound();

  if (!response.ok) {
    return <p>Ocurrió un error. Intenta nuevamente más tarde.</p>;
  }

  const article = await response.json();

  return <EditArticleClientPage article={article} />;
}
