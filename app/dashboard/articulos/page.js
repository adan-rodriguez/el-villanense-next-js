import { cookies } from "next/headers";
import ArticlesDashboardClientPage from "./page.client";
import { getArticles } from "@/app/lib/services/articles";
import { auth, db } from "@/app/lib/firebase/server";
import { redirect } from "next/navigation";

export default async function ArticlesDashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  let uid;
  try {
    const decodedIdToken = await auth.verifySessionCookie(sessionCookie);
    uid = decodedIdToken.uid;
  } catch (error) {
    console.error({ error });
    redirect("/login");
  }

  const authorsRef = db.collection("authors");
  const authorSnapshot = await authorsRef.doc(uid).get();
  const { nick } = authorSnapshot.data();

  const articles = await getArticles({ author: nick });

  return <ArticlesDashboardClientPage articles={articles} />;
}
