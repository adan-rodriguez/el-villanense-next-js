import { getSectionArticles } from "@/app/firebase/firebaseService";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const articles = await getSectionArticles(params.section);

  return NextResponse.json(articles);
}
