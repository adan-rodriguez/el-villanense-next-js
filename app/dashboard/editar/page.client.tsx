"use client";

import { useEditArticle } from "@/app/hooks/useEditArticle";
import styles from "@/app/ui/styles/ArticleForm.module.css";
import {
  users,
  // objCompare,
} from "@/app/lib/utils";
import { TinyMCE } from "@/app/ui/components/TinyMCE";
import { AuthorImage } from "@/app/ui/components/AuthorImage";
import { Button } from "@/app/ui/components/Button";
import { Label } from "@/app/ui/components/Label";
import { Input } from "@/app/ui/components/Input";
import { SelectImage } from "@/app/ui/components/SelectImage";
import { Form } from "@/app/ui/components/Form";
import { DragAndDrop } from "@/app/ui/components/DragAndDrop";
import { uploadImage } from "@/app/lib/server-actions";
import { Article } from "@/app/lib/types";

export function EditArticleClientPage({ article }: { article: Article }) {
  const { id } = article;

  const {
    title,
    image,
    altImage,
    lead,
    content,
    authors,
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
  } = useEditArticle(article);

  // const isNotEdited = objCompare(
  //   {
  //     title: article.title,
  //     image: article.image,
  //     altImage: article.altImage,
  //     lead: article.lead,
  //     section: article.section,
  //     content: article.content,
  //   },
  //   { title, image, altImage, lead, section, content }
  // );

  async function handleSubmitEditArticle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getLoading(true);

    const editedArticle = {
      title,
      image,
      altImage,
      lead,
      content,
      authors,
      anonymous,
    };

    if (imageFile) {
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
      editedArticle.image = secure_url;
    }

    const response = await fetch(`/api/article/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedArticle),
    });

    if (!response.ok) {
      alert("Ocurrió un error. Inténtelo nuevamente");
      getLoading(false);
      return;
    }

    alert("Artículo editado con éxito!");
    getLoading(false);

    router.push(`/${id}`);
  }

  async function handleDelete() {
    if (confirm("¿Estás seguro de borrar esta noticia?")) {
      const response = await fetch(`/api/article/${id}`, {
        method: "DELETE",
      });

      if (response.status !== 204) {
        alert("No se ha podido eliminar la noticia");
        return;
      }

      alert("Noticia eliminada con éxito");
      router.push("/dashboard");
    }
  }

  return (
    <>
      <h2 className={styles.title}>Editar artículo</h2>
      <Form
        style={{ maxWidth: "1000px" }}
        onSubmit={handleSubmitEditArticle}
        className={styles.form}
      >
        {authors && (
          <div className={styles.author_container}>
            {users
              .filter((user) => authors.includes(user.nick))
              .map((author) => (
                <div
                  key={author.nick}
                  className={styles.author_img_name_container}
                  style={
                    anonymous ? { opacity: "0.2", userSelect: "none" } : {}
                  }
                >
                  <p>Autor:</p>
                  <AuthorImage image={author.image} name={author.name} />
                  <p>{author.name}</p>
                </div>
              ))}
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
        )}
        <Label label="Título">
          <Input
            id="title"
            required={true}
            value={title}
            onChange={(e) => getTitle(e.target.value)}
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
          imageUrl={image}
        />
        <Label label="Descripción corta de la imagen &#40;para personas no videntes&#41;">
          <Input
            id="alt_image"
            required={true}
            value={altImage}
            onChange={(e) => getAltImage(e.target.value)}
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
          <Button
            type="submit"
            label="Editar artículo"
            disabled={loading}
            // disabled={isNotEdited}
            // style={isNotEdited ? { cursor: "not-allowed" } : {}}
            // title={isNotEdited? "El artículo no tiene cambios" : {}}
          />
          <Button
            type="button"
            label="Borrar artículo"
            disabled={loading}
            onClick={handleDelete}
          />
        </div>
      </Form>
      {loading && <p className={styles.editing}>Editando...</p>}
    </>
  );
}
