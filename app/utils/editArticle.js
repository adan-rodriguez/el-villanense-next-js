import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const editArticle = async (
  articleId,
  { title, image, altImage, lead, section, content }
) => {
  await setDoc(
    doc(db, "articles", articleId),
    {
      title,
      image,
      altImage,
      lead,
      section,
      content,
    },
    { merge: true }
  );
};
