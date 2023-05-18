import EditAndDeleteButtonsContainer from "@/app/components/EditAndDeleteButtonsContainer";
import { getAllArticles } from "@/app/firebase/firebaseService";
import styles from "@/app/styles/ArticlesDashboard.module.css";
import Image from "next/image";

export default async function ArticlesDashboard() {
  const articles = await getAllArticles();
  return (
    <div className={styles.container}>
      {articles.map((article) => (
        <div key={article.id}>
          <Image
            src={article.image}
            alt={article.altImage}
            width={257}
            height={171}
          />
          <div>
            <h2>{article.title}</h2>
            <EditAndDeleteButtonsContainer articleId={article.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
