import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { DOMAIN } from "./constants/domain";

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

  await fetch(
    `${DOMAIN}/api/revalidate?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`,
    {
      method: "POST",
      body: `${section}/${articleToEdit}`,
    }
  );
};
