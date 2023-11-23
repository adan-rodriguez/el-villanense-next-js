import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const editArticle = async ({
  articleId,
  article: { title, altImage, lead, section, content },
  image,
}) => {
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
