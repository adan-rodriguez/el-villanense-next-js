import { db } from "../firebase/server";
import { Article, ArticleData } from "../types";

export async function getArticles() {
  const articlesRef = db.collection("articles");

  const query = articlesRef.orderBy("createdAt", "desc");

  const articlesSnapshot = await query.get();

  const articles: Article[] = articlesSnapshot.docs.map((article) => {
    return {
      id: article.id,
      ...(article.data() as ArticleData),
    };
  });

  return articles;
}

export async function getArticlesByAuthor(author: string) {
  const articlesRef = db.collection("articles");

  const query = articlesRef
    .where("anonymous", "==", false)
    .where("authors", "array-contains", author)
    .orderBy("timestamp", "desc");

  const articlesSnapshot = await query.get();

  const articles: Article[] = articlesSnapshot.docs.map((article) => {
    return {
      id: article.id,
      ...(article.data() as ArticleData),
    };
  });

  return articles;
}

export async function getArticle(id: string) {
  const articlesRef = db.collection("articles");
  const articleSnapshot = await articlesRef.doc(id).get();

  if (!articleSnapshot.exists) return;

  const article: Article = {
    id: articleSnapshot.id,
    ...(articleSnapshot.data() as ArticleData),
  };

  return article;
}

export async function deleteArticle(id: string) {
  await db.collection("articles").doc(id).delete();
}

export async function addArticle(article): Promise<Article> {
  // Generar el slug del título quitando caracteres especiales
  const slugify = (text: string) =>
    text
      .toString()
      .normalize("NFD") // Normaliza a descomposición de caracteres
      .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
      .replace(/[^a-zA-Z0-9\s]/g, "") // Elimina caracteres especiales
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-"); // Reemplaza espacios con guiones

  const titleSlug = slugify(article.title);

  // Formatear la fecha actual como DD-MM-YY
  const today = new Date();
  const formattedDate = today
    .toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    .replace(/\//g, "-");

  // Concatenar el título y la fecha para formar el ID
  const id = `${titleSlug}-${formattedDate}`;

  const newArticle = {
    ...article,
    createdAt: today,
  };

  await db.collection("articles").doc(id).set(newArticle);

  newArticle.id = id;

  return newArticle;
}

export async function editArticle({ id, article }: { id: string }) {
  await db.collection("articles").doc(id).set(article, { merge: true });
  return { id, ...article };
}
