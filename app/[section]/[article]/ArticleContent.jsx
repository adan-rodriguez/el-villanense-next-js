"use client";

export default function ArticleContent({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
