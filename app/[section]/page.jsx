import Image from "next/image";
import Link from "next/link";
import { getSectionArticles } from "@/app/firebase/firebaseService";

export default async function Section({ params }) {
  const { section } = params;

  const articles = await getSectionArticles(section);

  return (
    <div>
      <h1>{section}</h1>
      <div>
        {articles.map((article) => (
          <Link key={article.id} href={`/${article.section}/${article.id}`}>
            <article>
              <Image
                src={article.image}
                alt={article.altImage}
                width={500}
                height={300}
                priority
              />
              <time dateTime={article.datetimeAttribute}>
                {article.dateContent}
              </time>
              <p>{article.title}</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
