"use client";

// import { useRouter } from "next/navigation";
import useDashboardForm from "../../hooks/useDashboardForm";
import { addArticle } from "../../utils/addArticle";
// import { useEffect } from "react";
import DashboardForm from "../../components/DashboardForm";
import { DOMAIN } from "@/app/utils/constants/domain";
// import useLogin from "@/app/hooks/useLogin";

function NewArticle() {
  // const { isUserLogged } = useLogin();

  const { article, settersArticle } = useDashboardForm();

  // const router = useRouter();

  // useEffect(() => {
  //   if (!isUserLogged) {
  //     router.push("/login");
  //   }
  // }, [isUserLogged]);

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
          try {
            await addArticle(article);
          } catch {
            return alert("No se ha podido subir la noticia");
          }

          await fetch(
            `${DOMAIN}/api/revalidateUploadAndEdit?secret=h5h4j8912hg6df8d1s3h55k8op6k46f2d4s`,
            { method: "POST", body: article.section }
          );

          alert("Artículo subido con éxito");
        }}
      />
    </>
  );
}

export default NewArticle;
