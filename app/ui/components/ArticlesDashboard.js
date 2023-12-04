"use client";

import EditAndDeleteButtonsContainer from "./EditAndDeleteButtonsContainer";
import styles from "../styles/ArticlesDashboard.module.css";
import { useState } from "react";

export default function ArticlesDashboard(props) {
  const [articles, setArticles] = useState(props.articles);
  const [search, setSearch] = useState("");

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
      {articles
        .filter((article) =>
          search
            ? article.title.toLowerCase().includes(search.toLowerCase())
            : true
        )
        .map((article) => (
          <div key={article.id}>
            <img src={article.image} alt={article.altImage} loading="lazy" />
            <div>
              <h2>{article.title}</h2>
              <EditAndDeleteButtonsContainer articleId={article.id} />
            </div>
          </div>
        ))}
    </div>
  );
}
