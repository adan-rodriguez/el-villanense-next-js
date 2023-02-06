import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { DOMAIN } from "./constants/domain";

export const deleteArticle = async (articleId, section) => {
  await deleteDoc(doc(db, "articles", articleId));
  await fetch(
    `${DOMAIN}/api/revalidate?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`,
    {
      method: "POST",
      body: section,
    }
  );
  alert("Noticia eliminada con éxito");
};
