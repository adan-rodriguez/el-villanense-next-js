import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

const articlesCollection = collection(db, "articles");

export const getAllArticlesFirebase = async () => {
  const q = query(articlesCollection, orderBy("timestamp", "desc"));
  const data = await getDocs(q);
  const articles = data.docs.map((art) => ({ id: art.id, ...art.data() }));
  return articles;
};

// export const getSectionArticles = async (section) => {
//   const q = query(
//     articlesCollection,
//     where("section", "==", section),
//     orderBy("timestamp", "desc")
//   );
//   const data = await getDocs(q);
//   const articles = data.docs.map((art) => ({ ...art.data(), id: art.id }));
//   return articles;
// };

export const getArticlesByAuthorFirebase = async (author) => {
  const q = query(
    articlesCollection,
    where("author", "==", author),
    orderBy("timestamp", "desc")
  );
  const data = await getDocs(q);
  const articles = data.docs.map((art) => ({ id: art.id, ...art.data() }));
  return articles;
};

// export const getLastArticle = async () => {
//   const q = query(articlesCollection, orderBy("timestamp", "desc"), limit(1));
//   const data = await getDocs(q);
//   const articleData = data.docs[0];
//   const article = { id: articleData.id, ...articleData.data() };
//   return article;
// };

export const getArticleFirebase = async (articleId) => {
  const articleRef = doc(db, "articles", articleId);
  const data = await getDoc(articleRef);
  if (data.exists()) {
    return { id: data.id, ...data.data() };
  }
};

// if (data.exists()) {
//   return { id: data.id, ...data.data() };
// } else {
//   // data.data() will be undefined in this case
//   return undefined
// }
