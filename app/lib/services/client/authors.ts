import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/client";
import { AuthorData } from "../../types";

export async function getAuthor(id: string) {
  const authorRef = doc(db, "authors", id);
  const authorSnap = await getDoc(authorRef);

  if (!authorSnap.exists()) throw new Error("Author not found");

  const author = {
    id: authorSnap.id,
    ...(authorSnap.data() as AuthorData),
  };
  return author;
}

export async function getClientAuthors() {
  const authorsSnapshot = await getDocs(collection(db, "authors"));

  if (authorsSnapshot.empty) return [];

  const authors = authorsSnapshot.docs.map((author) => {
    return {
      id: author.id,
      ...(author.data() as AuthorData),
    };
  });

  return authors;
}
