import { db } from "../firebase/server";

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
