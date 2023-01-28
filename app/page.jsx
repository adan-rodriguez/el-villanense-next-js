import Image from "next/image";
import styles from "./page.module.css";
import getAllArticles from "@/app/firebase/firebaseService";
import Link from "next/link";

export default async function Home() {
  const articles = await getAllArticles();

  return (
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
  );
}
