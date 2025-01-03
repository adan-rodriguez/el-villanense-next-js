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

export async function getAuthor(uid: string) {
  const authorRef = doc(db, "authors", uid);
  const authorSnap = await getDoc(authorRef);

  if (!authorSnap.exists()) throw new Error("Author not found");

  const author: Author = {
    id: authorSnap.id,
    ...(authorSnap.data() as AuthorData),
  };
  return author;
}

export async function getAuthorByNick(nick: string) {
  const q = query(collection(db, "authors"), where("nick", "==", nick));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return;

  const author: Author = querySnapshot.docs.map((author) => ({
    id: author.id,
    ...(author.data() as AuthorData),
  }))[0];
  return author;
}
