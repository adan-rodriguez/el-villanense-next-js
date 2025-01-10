import { notFound, redirect } from "next/navigation";
import { EditArticleClientPage } from "./page.client";

export default async function EditArticlePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;

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
