import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { DOMAIN } from "./constants/domain";
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

  await fetch(
    `${DOMAIN}/api/revalidate?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`,
    { method: "POST", body: article.section }
  );
};
