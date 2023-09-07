"use server";

import { addArticle } from "@/app/utils/addArticle";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { notFound } from "next/navigation";

export default async function handleSubmit(article) {
  try {
    await addArticle(article);
  } catch {
    notFound();
  }
  revalidatePath("/");
  redirect("/");
}
