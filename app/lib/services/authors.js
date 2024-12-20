import { db } from "../firebase/server";

export async function getAuthors() {
  const authorsSnapshot = await db.collection("authors").get();

  const authors = authorsSnapshot.docs.map((author) => author.data());

  return authors;
}

export async function getAuthorByNick(nick) {
  const authorsRef = db.collection("authors");
  const authorSnapshot = await authorsRef.where("nick", "==", nick).get();

  const author = authorSnapshot.docs.map((author) => ({
    uid: author.id,
    ...author.data(),
  }))[0];

  return author;
}
