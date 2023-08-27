import { getArticle } from "@/app/firebase/firebaseService";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  const article = await getArticle(params.article);

  if (Object.keys(article).length === 1) {
    return new Response("Not Found", {
      status: 404,
    });
  }

  return NextResponse.json(article);
}
