"use client";

import EditAndDeleteButtonsContainer from "@/app/components/EditAndDeleteButtonsContainer";
import { getAllArticles } from "@/app/services/articles";
import styles from "@/app/styles/ArticlesDashboard.module.css";
import { useEffect, useState } from "react";

export default function ArticlesDashboard() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");

  const obtainAllArticles = async () => {
    const articles = await getAllArticles();
    setArticles(articles);
  };

  useEffect(() => {
    obtainAllArticles();
  }, []);

  return (
    <div className={styles.container}>
      <input
        value={search}
        onChange={(e) =>
          !e.target.value.startsWith(" ") && setSearch(e.target.value)
        }
        placeholder="Buscar noticia"
      />
      <select onChange={() => setArticles(articles.toReversed())}>
        <option selected>Mas recientes</option>
        <option>Mas antiguos</option>
      </select>
      {search
        ? articles
            .filter((article) => article.title.toLowerCase().includes(search))
            .map((article) => (
              <div key={article.id}>
                <img src={article.image} alt={article.altImage} />
                <div>
                  <h2>{article.title}</h2>
                  <EditAndDeleteButtonsContainer articleId={article.id} />
                </div>
              </div>
            ))
        : articles.map((article) => (
            <div key={article.id}>
              <img src={article.image} alt={article.altImage} />
              <div>
                <h2>{article.title}</h2>
                <EditAndDeleteButtonsContainer articleId={article.id} />
              </div>
            </div>
          ))}
    </div>
  );
}
