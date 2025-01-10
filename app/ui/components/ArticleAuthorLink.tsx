"use client";

import styles from "../styles/ArticleAuthorLink.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ArticleAuthorLink({
  nick,
  name,
  fontSize = "11px",
  color = "inherit",
}: {
  nick: string;
  name: string;
  fontSize?: string;
  color?: string;
}) {
  const pathname = usePathname();

  if (pathname.includes("autor")) return null;

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
