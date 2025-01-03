"use client";

import styles from "../styles/ArticleContent.module.css";

export function ArticleContent({ content }: { content: string }) {
  return (
    <div
      className={styles.article_content}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
