import { db } from "../firebase/server";

// export async function getArticles({ author } = {}) {
//   const articlesCollection = collection(db, "articles");

//   try {
//     let q;
//     if (author) {
//       q = query(
//         articlesCollection,
//         where("authors", "array-contains", author),
//         where("anonymous", "==", false),
//         orderBy("timestamp", "desc")
//       );
//     } else {
//       q = query(articlesCollection, orderBy("timestamp", "desc"));
//     }

//     const data = await getDocs(q);

//     return data.docs.map((article) => ({
//       id: article.id,
//       ...article.data(),
//     }));
//   } catch (error) {
//     console.log("Ha ocurrido un error");
//   }
// }

export async function getArticles({ author } = {}) {
  const articlesRef = db.collection("articles");

  let query;

  if (author) {
    query = articlesRef
      .where("anonymous", "==", false)
      .where("authors", "array-contains", author)
      .orderBy("timestamp", "desc");
  } else {
    query = articlesRef.orderBy("timestamp", "desc");
  }

  const articlesSnapshot = await query.get();
  const articles = articlesSnapshot.docs.map((article) => ({
    id: article.id,
    ...article.data(),
  }));

  return articles;
}

// export async function getArticle({ articleId }) {
//   // if (isDev) {
//   //   const article = mock_articles.find((article) => article.id === articleId);
//   //   return article;
//   // }

//   try {
//     const articleRef = doc(db, "articles", articleId);
//     const data = await getDoc(articleRef);
//     if (data.exists()) {
//       return { id: data.id, ...data.data() };
//     }
//   } catch {
//     console.log("Ha ocurrido un error");
//   }
// }

export async function getArticle({ articleId }) {
  try {
    const articlesRef = db.collection("articles");
    const articleSnapshot = await articlesRef.doc(articleId).get();
    const article = {
      articleId: articleSnapshot.id,
      ...articleSnapshot.data(),
    };
    return article;
  } catch (error) {
    console.error(error);
  }
}
