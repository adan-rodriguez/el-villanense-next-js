"use client";

import DashboardForm from "@/app/components/DashboardForm";
import useDashboardForm from "@/app/hooks/useDashboardForm";
import { loginContext } from "@/app/layout";
import { editArticle } from "@/app/utils/editArticle";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function EditArticle({ params }) {
  const { articleToEdit } = params;

  const isUserLogged = useContext(loginContext);

  const { article, settersArticle } = useDashboardForm(articleToEdit);

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
        Editar artículo
      </h2>
      <DashboardForm
        article={article}
        settersArticle={settersArticle}
        isEditing
        handleSubmit={async () => {
          await editArticle(articleToEdit, article);

          alert("Artículo editado con éxito");
        }}
      />
    </>
  );
}
