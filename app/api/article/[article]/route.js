import { getArticle } from "@/app/firebase/firebaseService";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const article = await getArticle(params.article);

  return NextResponse.json(article);
}
