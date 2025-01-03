"use client";

import { getAuthorByNick } from "@/app/lib/services/client/authors";
import styles from "../styles/ArticleAuthorLink.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function ArticleAuthorLink({
  nick,
  fontSize = "11px",
  color = "inherit",
}: {
  nick: string;
  fontSize?: string;
  color?: string;
}) {
  const pathname = usePathname();

  if (pathname.includes("autor")) return null;

  const [name, setName] = useState<string | undefined>("Cargando...");

  useEffect(() => {
    async function obtainAuthor() {
      const author = await getAuthorByNick(nick);
      setName(author?.name);
    }
    obtainAuthor();
  }, []);

  if (!name) return null;

  return (
    <p className={styles.container} style={{ fontSize }}>
      Por{" "}
      <Link
        className={styles.link}
        href={`/autor/${nick}`}
        title={`Noticias de ${name}`}
        style={{ color }}
      >
        {name}
      </Link>
    </p>
  );
}
