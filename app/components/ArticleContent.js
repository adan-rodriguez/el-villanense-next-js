"use client";

import styles from "../styles/ArticleContent.module.css";

export default function ArticleContent({ content }) {
  return (
    <div
      className={styles.article_content}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{ paddingBottom: "20px" }}
    />
  );
}
