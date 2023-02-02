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

export const addArticleToFirestore = async (article) => {
  const dataForFirebase = prepareDataForFirebase(article, Date.now());

  await setDoc(
    doc(
      db,
      "articles",
      `${dataForFirebase.friendlyUrl}-${dataForFirebase.timestamp}`
    ),
    dataForFirebase
  );

  alert("Artículo subido con éxito");

  await fetch(
    // `http://localhost:3000/api/revalidate?secret=${process.env.MY_SECRET_TOKEN}`
    `${DOMAIN}/api/revalidate?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`,
    { method: "POST", body: article.section }
  );
};
