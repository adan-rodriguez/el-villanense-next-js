"use client";

import { useRouter } from "next/navigation";
import useAdmin from "../hooks/useAdmin";
import { addArticleToFirestore } from "../utils/addArticleToFirestore";
import { useContext, useEffect } from "react";
import { loginContext } from "@/app/layout";
import AdminForm from "../components/AdminForm";
import { DOMAIN } from "../utils/constants/domain";

function AdminPage() {
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
      isEditing={false}
      handleSubmit={async () => {
        await addArticleToFirestore(article);

        alert("Artículo subido con éxito");

        await fetch(
          // `http://localhost:3000/api/revalidate?secret=${process.env.MY_SECRET_TOKEN}`
          `${DOMAIN}/api/revalidate?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`,
          { method: "POST", body: article.section }
        );
      }}
    />
  );
}

export default AdminPage;
