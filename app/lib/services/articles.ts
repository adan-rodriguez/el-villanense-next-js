import { db } from "../firebase/server";
import { Article, ArticleBasicData, ArticleData } from "../types";

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

export async function getArticlesByAuthorId(id: string) {
  const articlesRef = db.collection("articles");

  const query = articlesRef
    .where("authorsIds", "array-contains", id)
    .orderBy("createdAt", "desc");

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

export async function addArticle(article: ArticleBasicData) {
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

  const createdAt = new Date();

  // Formatear la fecha actual como DD-MM-YY
  const formattedDate = createdAt
    .toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    .replace(/\//g, "-");

  // Concatenar el título y la fecha para formar el ID
  const id = `${titleSlug}-${formattedDate}`;

  await db
    .collection("articles")
    .doc(id)
    .set({ createdAt, ...article });

  return {
    id,
    createdAt,
    ...article,
  };
}

export async function editArticle({
  id,
  article,
}: {
  id: string;
  article: ArticleBasicData;
}) {
  const lastModified = new Date();
  await db
    .collection("articles")
    .doc(id)
    .set({ lastModified, ...article }, { merge: true });
  return { id, lastModified, ...article };
}
