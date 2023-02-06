import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

const articlesCollection = collection(db, "articles");

export const getAllArticles = async () => {
  const q = query(articlesCollection, orderBy("timestamp", "desc"));
  const data = await getDocs(q);
  const articles = data.docs.map((art) => ({ ...art.data(), id: art.id }));
  return articles;
};

export const getSectionArticles = async (section) => {
  const q = query(
    articlesCollection,
    where("section", "==", section),
    orderBy("timestamp", "desc")
  );
  const data = await getDocs(q);
  const articles = data.docs.map((art) => ({ ...art.data(), id: art.id }));
  return articles;
};

// export const getLastArticle = async () => {
//   const q = query(articlesCollection, orderBy("timestamp", "desc"), limit(1));
//   const data = await getDocs(q);
//   const articleData = data.docs[0];
//   const article = { id: articleData.id, ...articleData.data() };
//   return article;
// };

export const getArticle = async (articleId) => {
  const articleRef = doc(db, "articles", articleId);
  const data = await getDoc(articleRef);
  const article = { id: data.id, ...data.data() };
  return article;
};
