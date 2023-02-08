import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const deleteArticle = async (articleId) => {
  await deleteDoc(doc(db, "articles", articleId));
};
