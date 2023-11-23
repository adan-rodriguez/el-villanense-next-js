import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getFriendlyUrl } from "./getFriendlyUrl";
import { timestampToDatetime } from "./timestampToDatetime";

export const addArticle = async ({
  article: { title, altImage, lead, section, content, author },
  image,
}) => {
  const timestamp = Date.now();
  const dataForFirebase = {
    title,
    image,
    altImage,
    lead,
    section,
    content,
    author,
    timestamp,
    ...timestampToDatetime(timestamp),
    friendlyUrl: getFriendlyUrl(title),
  };

  await setDoc(
    doc(
      db,
      "articles",
      `${dataForFirebase.friendlyUrl}-${dataForFirebase.timestamp}`
    ),
    dataForFirebase
  );
};
