"use client";

import styles from "@/app/ui/styles/ArticlesDashboardClientPage.module.css";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EditAndDeleteButtonsContainer from "@/app/ui/components/EditAndDeleteButtonsContainer";

// no estoy usando los filtros de la url. Los pongo cuando en un futuro aprenda a usarlos para filtrar

export default function ArticlesDashboardClientPage({
  articles: initialArticles,
}) {
  const [articles, setArticles] = useState(initialArticles);
  const [search, setSearch] = useState("");
  // const [isReversed, setIsReversed] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilters({ search, reverse }) {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    }
    if (search === "") {
      params.delete("search");
    }
    if (reverse === true) {
      params.set("reverse", "true");
    }
    if (reverse === false) {
      params.delete("reverse");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setSearch(params.get("search") || "");
    // setIsReversed(Boolean(params.get("reverse")) || false);
  }, []);

  return (
    <div className={styles.container}>
      <input
        value={search}
        onChange={(e) => {
          if (!e.target.value.startsWith(" ")) {
            handleFilters({ search: e.target.value });
            setSearch(e.target.value);
          }
        }}
        placeholder="Buscar noticia"
      />
      <select
        onChange={(e) => {
          handleFilters({ reverse: e.target.value === "mas-antiguos" });
          setArticles(articles.toReversed());
          // setIsReversed(e.target.value === "mas-antiguos");
        }}
      >
        <option value="mas-recientes" selected>
          Mas recientes
        </option>
        <option value="mas-antiguos">Mas antiguos</option>
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
