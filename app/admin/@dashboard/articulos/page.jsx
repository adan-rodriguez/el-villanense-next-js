import EditAndDeleteButtonsContainer from "@/app/components/EditAndDeleteButtonsContainer";
import { getAllArticles } from "@/app/firebase/firebaseService";
import styles from "@/app/styles/ArticlesDashboard.module.css";

export default async function ArticlesDashboard() {
  const articles = await getAllArticles();
  return (
    <div className={styles.container}>
      {articles.map((article) => (
        <div key={article.id}>
          <img src={article.image} alt={article.altImage} />
          <div>
            <h2>{article.title}</h2>
            <EditAndDeleteButtonsContainer articleId={article.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
