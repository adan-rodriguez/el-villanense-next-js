"use client";

import { useRouter } from "next/navigation";
import AdminForm from "./AdminForm";
import useAdmin from "../hooks/useAdmin";
import { addArticleToFirestore } from "../utils/addArticleToFirestore";

function AdminPage() {
  const { article, settersArticle } = useAdmin();

  const router = useRouter();

  return (
    <>
      <h1 className="title-new-article">Nuevo artículo</h1>
      <AdminForm
        article={article}
        settersArticle={settersArticle}
        addArticle={async () => {
          await addArticleToFirestore(article);
          router.push("/");
        }}
      />
    </>
  );
}

export default AdminPage;
