import { NextResponse } from "next/server";
import { getAllArticles } from "../../firebase/firebaseService";

export async function GET() {
  const articles = await getAllArticles();

  return NextResponse.json(articles);
}
