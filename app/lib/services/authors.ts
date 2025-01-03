import { db } from "../firebase/server";
import { Author, AuthorData } from "../types";

export async function getAuthors() {
  const authorsSnapshot = await db.collection("authors").get();

  const authors = authorsSnapshot.docs.map((author) => author.data());

  return authors;
}

export async function getAuthorByNick(nick: string) {
  const authorsRef = db.collection("authors");
  const authorSnapshot = await authorsRef.where("nick", "==", nick).get();

  if (authorSnapshot.empty) return;

  const author: Author = authorSnapshot.docs.map((author) => ({
    id: author.id,
    ...(author.data() as AuthorData),
  }))[0];
  return author;
}

export async function getAuthor(uid: string) {
  const authorsRef = db.collection("authors");
  const authorSnapshot = await authorsRef.doc(uid).get();

  if (!authorSnapshot.exists) throw new Error("Author not found");

  const { id } = authorSnapshot;
  const data = authorSnapshot.data() as AuthorData;
  const author: Author = { id, ...data };
  return author;
}
