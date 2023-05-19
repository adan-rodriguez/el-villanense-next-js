import { getAllArticles } from "@/app/firebase/firebaseService";
import { NextResponse } from "next/server";

export async function GET() {
  const articles = await getAllArticles();
  return NextResponse.json(articles);
}
