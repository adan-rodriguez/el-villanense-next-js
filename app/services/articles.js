import {
  getAllArticlesFirebase,
  getArticleFirebase,
  getArticlesByAuthorFirebase,
} from "../firebase/firebaseService";
import mock_articles from "../utils/mocks/mock_articles.json";

export async function getAllArticles() {
  if (process.env.NODE_ENV === "development") return mock_articles;
  return await getAllArticlesFirebase();
}

export async function getArticle({ articleId }) {
  if (process.env.NODE_ENV === "development") {
    const article = mock_articles.find((article) => article.id === articleId);
    if (article) return article;
    throw new Error(`El artículo con id '${articleId}' no existe`);
  }

  const article = await getArticleFirebase(articleId);
  if (article) return article;
  throw new Error(`El artículo con id '${articleId}' no existe`);
}

export async function getArticlesByAuthor({ name }) {
  if (process.env.NODE_ENV === "development")
    return mock_articles.filter((article) => article.author === name);
  return await getArticlesByAuthorFirebase(name);
}
