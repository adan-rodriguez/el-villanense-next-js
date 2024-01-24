"use client";

import styles from "../styles/ArticleAuthorLink.module.css";
import { users } from "../../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ArticleAuthorLink({ nick, fontSize = "11px", color }) {
  const pathname = usePathname();

  if (pathname.includes("autor")) return null;

  const { name } = users.find((user) => user.nick === nick);

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
