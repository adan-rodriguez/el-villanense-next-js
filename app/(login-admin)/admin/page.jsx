"use client";

import { useRouter } from "next/navigation";
import AdminForm from "./AdminForm";
import useAdmin from "../../hooks/useAdmin";
import { addArticleToFirestore } from "../../utils/addArticleToFirestore";
// import useIsLogin from "../../hooks/useIsLogin";
// import { useEffect } from "react";
import { useContext, useEffect } from "react";
import { loginContext } from "../layout";

function AdminPage() {
  // const { isUserLogged } = useIsLogin();
  const isUserLogged = useContext(loginContext);

  const { article, settersArticle } = useAdmin();

  const router = useRouter();

  useEffect(() => {
    if (!isUserLogged) {
      router.push("/login");
    }
  }, [isUserLogged]);

  return (
    <AdminForm
      article={article}
      settersArticle={settersArticle}
      addArticle={async () => {
        await addArticleToFirestore(article);
        alert("Artículo subido con éxito");
      }}
    />
  );
}

export default AdminPage;
