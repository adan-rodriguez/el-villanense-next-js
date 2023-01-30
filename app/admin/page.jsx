"use client";

import { useRouter } from "next/navigation";
import AdminForm from "./AdminForm";
import useAdmin from "../hooks/useAdmin";
import { addArticleToFirestore } from "../utils/addArticleToFirestore";
import useIsLogin from "../hooks/useIsLogin";
import { useEffect } from "react";

function AdminPage() {
  const { isUserLogged } = useIsLogin();

  const { article, settersArticle } = useAdmin();

  const router = useRouter();

  useEffect(() => {
    if (!isUserLogged) {
      router.push("/login");
    }
  }, [isUserLogged]);

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
