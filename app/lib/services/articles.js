import {
  deleteDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { db } from "../config-firebase";
import { getFriendlyUrl, timestampToDatetime } from "../utils";
// import mock_articles from "../mocks/articles.json";
// import { isDev } from "../config";

const articlesCollection = collection(db, "articles");

export async function getArticles({ author } = {}) {
  // if (isDev) {
  //   if (author) {
  //     return mock_articles.filter(
  //       (article) => article.authors.includes(author) && !article.anonymous
  //     );
  //   }
  //   return mock_articles;
  // }

  try {
    let q;
    if (author) {
      q = query(
        articlesCollection,
        where("authors", "array-contains", author),
        where("anonymous", "==", false),
        orderBy("timestamp", "desc")
      );
    } else {
      q = query(articlesCollection, orderBy("timestamp", "desc"));
    }

    const data = await getDocs(q);

    return data.docs.map((article) => ({
      id: article.id,
      ...article.data(),
    }));
  } catch (error) {
    console.log("Ha ocurrido un error");
  }
}

export async function getArticle({ articleId }) {
  // if (isDev) {
  //   const article = mock_articles.find((article) => article.id === articleId);
  //   return article;
  // }

  try {
    const articleRef = doc(db, "articles", articleId);
    const data = await getDoc(articleRef);
    if (data.exists()) {
      return { id: data.id, ...data.data() };
    }
  } catch {
    console.log("Ha ocurrido un error");
  }
}

export const addArticle = async ({
  article: {
    title,
    image,
    altImage,
    lead,
    section,
    content,
    authors,
    anonymous,
  },
}) => {
  const timestamp = Date.now();
  const newArticle = {
    title,
    image,
    altImage,
    lead,
    section,
    content,
    authors,
    anonymous,
    timestamp,
    ...timestampToDatetime({ timestamp }),
    friendlyUrl: getFriendlyUrl({ string: title }),
  };

  const id = `${newArticle.friendlyUrl}-${newArticle.timestamp}`;

  await setDoc(doc(db, "articles", id), newArticle);
  newArticle.id = id;
  return newArticle;
};

export const deleteArticle = async ({ articleId }) => {
  await deleteDoc(doc(db, "articles", articleId));
  return `Artículo con id '${articleId}' eliminado`;
};

export const editArticle = async ({
  articleId,
  article: { title, image, altImage, lead, section, content, authors },
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
      authors,
    },
    { merge: true }
  );

  return `Artículo con id '${articleId}' editado`;
};

// export const getSectionArticlesDatabase = async ({section}) => {
//   const q = query(
//     articlesCollection,
//     where("section", "==", section),
//     orderBy("timestamp", "desc")
//   );
//   const data = await getDocs(q);
//   const articles = data.docs.map((art) => ({ ...art.data(), id: art.id }));
//   return articles;
// };

// export const getLastArticleDatabase = async () => {
//   const q = query(articlesCollection, orderBy("timestamp", "desc"), limit(1));
//   const data = await getDocs(q);
//   const articleData = data.docs[0];
//   const article = { id: articleData.id, ...articleData.data() };
//   return article;
// };

// if (data.exists()) {
//   return { id: data.id, ...data.data() };
// } else {
//   // data.data() will be undefined in this case
//   return undefined
// }
