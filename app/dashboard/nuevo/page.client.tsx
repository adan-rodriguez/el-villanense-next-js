"use client";

import styles from "@/app/ui/styles/ArticleForm.module.css";
import { TinyMCE } from "@/app/ui/components/TinyMCE";
import { AuthorImage } from "@/app/ui/components/AuthorImage";
import { useNewArticle } from "@/app/hooks/useNewArticle";
import { Form } from "@/app/ui/components/Form";
import { Label } from "@/app/ui/components/Label";
import { Input } from "@/app/ui/components/Input";
import { SelectImage } from "@/app/ui/components/SelectImage";
import { DragAndDrop } from "@/app/ui/components/DragAndDrop";
import { uploadImage } from "@/app/lib/server-actions";
import { Article, Author } from "@/app/lib/types";
import { Button } from "@/app/ui/components/Button";
import { getAuthor } from "@/app/lib/services/client/authors";

export function NewArticleClientPage({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image?: string;
}) {
  const {
    title,
    altImage,
    lead,
    content,
    anonymous,
    getTitle,
    getAltImage,
    getLead,
    getContent,
    getAnonymous,
    imageFile,
    getImageFile,
    loading,
    getLoading,
    router,
  } = useNewArticle();

  // const isCompleted =
  //   Boolean(title) &&
  //   Boolean(altImage) &&
  //   Boolean(lead) &&
  //   Boolean(section) &&
  //   Boolean(content) &&
  //   Boolean(imageFile);

  async function handleSubmitNewArticle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!imageFile) {
      alert("Sube una imagen!");
      return;
    }

    if (content === "") {
      alert("Escribe el cuerpo de la noticia!");
      return;
    }

    getLoading(true);

    let formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "elvillanense");

    const response = await uploadImage(formData);

    if (!response.ok) {
      alert("Ocurrió un error. Inténtelo nuevamente");
      getLoading(false);
      return;
    }

    const { secure_url } = await response.json();

    let author: Author;
    try {
      author = await getAuthor(id);
    } catch (error) {
      alert("Ocurrió un error. Inténtelo nuevamente");
      getLoading(false);
      return;
    }

    const responseAddArticles = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        image: secure_url,
        altImage,
        lead,
        content,
        authors: [author.nick],
        anonymous,
      }),
    });

    if (responseAddArticles.status !== 201) {
      alert("Ocurrió un error. Inténtelo nuevamente");
      getLoading(false);
      return;
    }

    alert("Artículo agregado con éxito!");
    getLoading(false);

    const article: Article = await responseAddArticles.json();

    router.push(`/${article.id}`);
  }

  return (
    <>
      <h2 className={styles.title}>Nuevo artículo</h2>
      <Form style={{ maxWidth: "1000px" }} onSubmit={handleSubmitNewArticle}>
        <div className={styles.author_container}>
          <div
            className={styles.author_img_name_container}
            style={anonymous ? { opacity: "0.2", userSelect: "none" } : {}}
          >
            <p>Autor:</p>
            <AuthorImage image={image} name={name} />
            <p>{name}</p>
          </div>
          <label className={styles.author_label}>
            <input
              onChange={(e) => getAnonymous(e.target.checked)}
              type="checkbox"
            />
            {!anonymous
              ? "Marcá la casilla si preferís que la noticia no tenga autor"
              : "Desmarcá la casilla si preferís que la noticia tenga autor"}
          </label>
        </div>
        <Label label="Título">
          <Input
            id="title"
            required={true}
            value={title}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              getTitle(e.currentTarget.value)
            }
          />
        </Label>
        <SelectImage getImageFile={getImageFile} />
        <DragAndDrop
          allowedImageFileTypes={[
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/webp",
          ]}
          getImageFile={getImageFile}
          externalImageFile={imageFile}
        />
        <Label label="Descripción corta de la imagen &#40;para personas no videntes&#41;">
          <Input
            id="alt_image"
            required={true}
            value={altImage}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              getAltImage(e.currentTarget.value)
            }
          />
        </Label>
        <Label label="Entrada">
          <textarea
            className={styles.textarea}
            required
            value={lead}
            onChange={(e) => getLead(e.target.value)}
            rows={4}
          />
        </Label>
        <TinyMCE content={content} getContent={getContent} />
        <div className={styles.buttons_container}>
          {/* <Button
            type="submit"
            label="Subir artículo"
            // disabled={!isCompleted}
            // style={!isCompleted ? { cursor: "not-allowed" } : {}}
            // title={!isCompleted ? "Faltan completar campos" : ""}
          /> */}
          <Button label="Subir artículo" type="submit" disabled={loading} />
        </div>
      </Form>
      {loading && <p className={styles.upload}>Subiendo...</p>}
    </>
  );
}
