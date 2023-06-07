import { getArticlesByAuthor } from "@/app/firebase/firebaseService";
import { users } from "@/app/utils/constants/users";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { autor } = params;

  let editor = "";

  for (let user in users) {
    if (users[user].nick === autor) {
      editor = user;
      break;
    }
  }
  const articles = await getArticlesByAuthor(editor);

  return NextResponse.json(articles);
}
