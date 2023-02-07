"use client";

import { useRouter } from "next/navigation";
import useDashboardForm from "../../hooks/useDashboardForm";
import { addArticle } from "../../utils/addArticle";
import { useContext, useEffect } from "react";
import { loginContext } from "@/app/layout";
import DashboardForm from "../../components/DashboardForm";

function NewArticle() {
  const isUserLogged = useContext(loginContext);

  const { article, settersArticle } = useDashboardForm();

  const router = useRouter();

  useEffect(() => {
    if (!isUserLogged) {
      router.push("/login");
    }
  }, [isUserLogged]);

  return (
    <>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Nuevo artículo
      </h2>
      <DashboardForm
        article={article}
        settersArticle={settersArticle}
        isEditing={false}
        handleSubmit={async () => {
          await addArticle(article);

          alert("Artículo subido con éxito");
        }}
      />
    </>
  );
}

export default NewArticle;
