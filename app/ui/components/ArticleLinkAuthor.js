"use client";

import styles from "../styles/ArticleLink.module.css";
import { users } from "../../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/app/lib/routes";

export default function ArticleLinkAuthor({ nick }) {
  const pathname = usePathname();

  if (pathname.includes("autor")) return null;

  const { name } = users.find((user) => user.nick === nick);

  return (
    <p className={styles.article_link_author_name}>
      Por{" "}
      <Link
        className={styles.article_link_author_name_link}
        href={`${routes.author.root}/${nick}`}
      >
        {name}
      </Link>
    </p>
  );
}
