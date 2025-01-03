import { cookies } from "next/headers";
import { NewArticleClientPage } from "./page.client";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/firebase/server";

export default async function NewArticlePage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let decodedIdToken;
  try {
    decodedIdToken = await auth.verifySessionCookie(sessionCookie);
  } catch (error) {
    redirect("/login");
  }

  const { uid, name, picture } = decodedIdToken;

  return <NewArticleClientPage id={uid} name={name} image={picture} />;
}
