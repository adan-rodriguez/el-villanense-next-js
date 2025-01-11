import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/client";
import { Author, AuthorData } from "../../types";

export async function getAuthor(id: string): Promise<Author> {
  const authorRef = doc(db, "authors", id);
  const authorSnap = await getDoc(authorRef);

  if (!authorSnap.exists()) throw new Error("Author not found");

  const author = {
    id: authorSnap.id,
    ...(authorSnap.data() as AuthorData),
  };
  return author;
}
