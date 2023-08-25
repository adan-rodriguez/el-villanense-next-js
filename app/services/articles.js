import { DOMAIN } from "../utils/constants/domain";
import mock_articles from "../utils/mocks/mock_articles.json";

export async function getAllArticles() {
  let articles;
  if (process.env.NODE_ENV === "development") {
    articles = mock_articles;
  } else {
    // articles = await getAllArticles();
    const response = await fetch(`${DOMAIN}/api/articles`);
    articles = await response.json();
  }
  return articles;
}

export async function getArticle({ articleId }) {
  let article;
  if (process.env.NODE_ENV === "development") {
    article = mock_articles.find((article) => article.id === articleId) ?? {
      id: articleId,
    };
  } else {
    // article = await getArticle(articleId);
    const response = await fetch(`${DOMAIN}/api/article/${articleId}`);
    article = await response.json();
  }
  return article;
}

export async function getArticlesByAuthor({ name, nick }) {
  let articles;
  if (process.env.NODE_ENV === "development") {
    articles = mock_articles.filter((article) => article.author === name);
  } else {
    // articles = await getArticlesByAuthor(editor);
    const response = await fetch(`${DOMAIN}/api/articles/author/${nick}`);
    articles = await response.json();
  }
  return articles;
}
