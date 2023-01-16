import Link from "next/link";
import { getSectionDocs } from "../firebase/firebaseService";

export default async function Section({ params }) {
  const { section } = params;

  const articles = await getSectionDocs(section);

  return (
    <div>
      {articles.map((article) => (
        <Link key={article.id} href={`/${article.section}/${article.id}`}>
          <article>
            <img src={article.image} alt={article.altImage} loading="lazy" />
            <time dateTime={article.datetimeAttribute}>
              {article.dateContent}
            </time>
            <p>{article.title}</p>
          </article>
        </Link>
      ))}
    </div>
  );
}
