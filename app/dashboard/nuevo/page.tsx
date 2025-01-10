import { cookies } from "next/headers";
import { NewArticleClientPage } from "./page.client";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/firebase/server";
import { getAuthor } from "@/app/lib/services/authors";

export default async function NewArticlePage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) redirect("/login");

  let id;
  try {
    const decodedIdToken = await auth.verifySessionCookie(sessionCookie);
    id = decodedIdToken.uid;
  } catch (error) {
    console.error(error);
    cookieStore.delete("__session");
    redirect("/login");
  }

  let author;
  try {
    author = await getAuthor(id);
  } catch (error) {
    console.error(error);
    redirect("/dashboard");
  }

  return (
    <NewArticleClientPage
      author={{
        id: author.id,
        name: author.name,
        image: author.image,
        nick: author.nick,
        anonymous: false,
      }}
    />
  );
}
