"use client";

import EditAndDeleteButtonsContainer from "@/app/components/EditAndDeleteButtonsContainer";
import { getAllArticlesFirebase } from "@/app/firebase/firebaseService";
import styles from "@/app/styles/ArticlesDashboard.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ArticlesDashboard() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const obtainAllArticles = async () => {
      const allArticles = await getAllArticlesFirebase();
      setArticles(allArticles);
    };
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
                <img
                  src={article.image}
                  alt={article.altImage}
                  // width={257}
                  // height={171}
                />
                <div>
                  <h2>{article.title}</h2>
                  <EditAndDeleteButtonsContainer articleId={article.id} />
                </div>
              </div>
            ))
        : articles.map((article) => (
            <div key={article.id}>
              <img
                src={article.image}
                alt={article.altImage}
                // width={257}
                // height={171}
              />
              <div>
                <h2>{article.title}</h2>
                <EditAndDeleteButtonsContainer articleId={article.id} />
              </div>
            </div>
          ))}
    </div>
  );
}
