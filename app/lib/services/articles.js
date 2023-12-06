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
import mock_articles from "../mocks/articles.json";

const articlesCollection = collection(db, "articles");

export async function getArticles({ author } = {}) {
  const { NODE_ENV, NEXT_PUBLIC_ENV } = process.env;
  if (NODE_ENV === "development" || NEXT_PUBLIC_ENV === "development") {
    if (author) {
      return mock_articles.filter((article) => article.author === author);
    }
    return mock_articles;
  }

  try {
    let q;
    if (author) {
      q = query(
        articlesCollection,
        where("author", "==", author),
        orderBy("timestamp", "desc")
      );
    } else {
      q = query(articlesCollection, orderBy("timestamp", "desc"));
    }

    const data = await getDocs(q);
    const articles = data.docs.map((article) => ({
      id: article.id,
      ...article.data(),
    }));
    return articles;
  } catch {
    console.log("Ha ocuurido un error");
  }
}

export async function getArticle({ articleId }) {
  const { NODE_ENV, NEXT_PUBLIC_ENV } = process.env;
  if (NODE_ENV === "development" || NEXT_PUBLIC_ENV === "development") {
    const article = mock_articles.find((article) => article.id === articleId);
    return article;
  }

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
  article: { title, image, altImage, lead, section, content, author },
}) => {
  const timestamp = Date.now();
  const data = {
    title,
    image,
    altImage,
    lead,
    section,
    content,
    author,
    timestamp,
    ...timestampToDatetime({ timestamp }),
    friendlyUrl: getFriendlyUrl({ string: title }),
  };

  const { NODE_ENV, NEXT_PUBLIC_ENV } = process.env;
  if (NODE_ENV === "development" || NEXT_PUBLIC_ENV === "development") {
    data.id = `${data.friendlyUrl}-${data.timestamp}`;
    mock_articles.push(data);
    return data;
  }

  await setDoc(
    doc(db, "articles", `${data.friendlyUrl}-${data.timestamp}`),
    data
  );
  data.id = `${data.friendlyUrl}-${data.timestamp}`;
  return data;
};

export const deleteArticle = async ({ articleId }) => {
  const { NODE_ENV, NEXT_PUBLIC_ENV } = process.env;
  if (NODE_ENV === "development" || NEXT_PUBLIC_ENV === "development") {
    const index = mock_articles.findIndex(
      (article) => article.id === articleId
    );
    mock_articles.splice(index, 1);
    return;
  }

  await deleteDoc(doc(db, "articles", articleId));
};

export const editArticle = async ({
  articleId,
  article: { title, altImage, lead, section, content },
  image,
}) => {
  const { NODE_ENV, NEXT_PUBLIC_ENV } = process.env;
  if (NODE_ENV === "development" || NEXT_PUBLIC_ENV === "development") {
    const index = mock_articles.findIndex(
      (article) => article.id === articleId
    );
    console.log(mock_articles[index]);
    mock_articles[index].title = title;
    mock_articles[index].image = image;
    mock_articles[index].altImage = altImage;
    mock_articles[index].lead = lead;
    mock_articles[index].section = section;
    mock_articles[index].content = content;
    console.log(mock_articles[index]);
    return;
  }

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
