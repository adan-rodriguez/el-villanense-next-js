"use client";

import styles from "../styles/ArticleLink.module.css";
import { users } from "../../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ArticleLinkAuthor({ name }) {
  const pathname = usePathname();

  if (pathname.includes("autores")) return null;

  return (
    <p className={styles.article_link_author_name}>
      Por{" "}
      <Link
        className={styles.article_link_author_name_link}
        href={`/autores/${users.find((user) => user.name === name).nick}`}
      >
        {name}
      </Link>
    </p>
  );
}
