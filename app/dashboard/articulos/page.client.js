"use client";

import styles from "@/app/ui/styles/ArticlesDashboardClientPage.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import EditAndDeleteButtons from "@/app/ui/components/EditAndDeleteButtons";
import { ArrowsSortIcon } from "@/app/ui/icons/ArrowsSortIcon";

// no estoy usando los filtros de la url. Los pongo cuando en un futuro aprenda a usarlos para filtrar

export default function ArticlesDashboardClientPage({
  articles: initialArticles,
}) {
  const [articles, setArticles] = useState(initialArticles);
  const [search, setSearch] = useState("");
  const [isReversed, setIsReversed] = useState(false);
  const isFirstRender = useRef(true);

  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  // function handleFilters({ search, reverse }) {
  //   const params = new URLSearchParams(searchParams);
  //   if (search) {
  //     params.set("search", search);
  //   }
  //   if (search === "") {
  //     params.delete("search");
  //   }
  //   if (reverse === true) {
  //     params.set("reverse", "true");
  //   }
  //   if (reverse === false) {
  //     params.delete("reverse");
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }

  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams);
  //   setSearch(params.get("search") || "");
  //   // setIsReversed(Boolean(params.get("reverse")) || false);
  // }, []);

  const filteredArticles = useMemo(() => {
    return search
      ? articles.filter((article) =>
          article.title.toLowerCase().includes(search.toLowerCase())
        )
      : articles;
  }, [articles, search]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setArticles(articles.toReversed());
  }, [isReversed]);

  return (
    <div className={styles.container}>
      <header className={styles.controls}>
        <input
          value={search}
          onChange={(e) => {
            if (e.target.value.startsWith(" ")) return;
            // handleFilters({ search: e.target.value });
            setSearch(e.target.value);
          }}
          placeholder="Título de la noticia..."
        />
        <button
          title={isReversed ? "Más recientes primero" : "Más antiguos primero"}
          onClick={() => setIsReversed(!isReversed)}
        >
          <ArrowsSortIcon />
        </button>
        {/* <select
        onChange={(e) => {
          // handleFilters({ reverse: e.target.value === "mas-antiguos" });
          setArticles(articles.toReversed());
          setIsReversed(e.target.value === "mas-antiguos");
        }}
        >
        <option value="mas-recientes" selected>
          Mas recientes
        </option>
        <option value="mas-antiguos">Mas antiguos</option>
      </select> */}
      </header>
      <section className={styles.articles}>
        {filteredArticles.length === 0 ? (
          <p>No hay resultados</p>
        ) : (
          filteredArticles.map((article) => (
            <article key={article.id} className={styles.article}>
              <img src={article.image} alt={article.altImage} loading="lazy" />
              <div>
                <h2>{article.title}</h2>
                <EditAndDeleteButtons
                  articleId={article.id}
                  nick={article.authors[0]}
                />
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
