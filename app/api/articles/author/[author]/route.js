import { getArticlesByAuthor } from "@/app/firebase/firebaseService";
import { users } from "@/app/utils/constants/users";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { author } = params;

  const user = users.find((user) => user.nick === author);

  if (!user) {
    return new Response("Not Found", { status: 400 });
  }

  const articles = await getArticlesByAuthor(user.name);

  return NextResponse.json(articles);
}
