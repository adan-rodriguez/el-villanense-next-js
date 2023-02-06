import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getFriendlyUrl } from "./getFriendlyUrl";
import { timestampToDatetime } from "./timestampToDatetime";

const prepareDataForFirebase = (article, timestamp) => {
  const dataForFirebase = {
    ...article,
    timestamp,
    ...timestampToDatetime(timestamp),
    friendlyUrl: getFriendlyUrl(article.title),
  };

  return dataForFirebase;
};

export const addArticle = async (article) => {
  const dataForFirebase = prepareDataForFirebase(article, Date.now());

  await setDoc(
    doc(
      db,
      "articles",
      `${dataForFirebase.friendlyUrl}-${dataForFirebase.timestamp}`
    ),
    dataForFirebase
  );
};
