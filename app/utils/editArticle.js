import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const editArticle = async (
  { title, image, altImage, lead, section, content },
  articleId
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
