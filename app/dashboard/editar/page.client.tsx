"use client";

import { useEditArticle } from "@/app/hooks/useEditArticle";
import styles from "@/app/ui/styles/ArticleForm.module.css";
import { TinyMCE } from "@/app/ui/components/TinyMCE";
import { AuthorImage } from "@/app/ui/components/AuthorImage";
import { Button } from "@/app/ui/components/Button";
import { Label } from "@/app/ui/components/Label";
import { Input } from "@/app/ui/components/Input";
import { SelectImage } from "@/app/ui/components/SelectImage";
import { Form } from "@/app/ui/components/Form";
import { uploadImage } from "@/app/lib/server-actions";
import { Article } from "@/app/lib/types";

export function EditArticleClientPage({ article }: { article: Article }) {
  const { id, image, authorsIds } = article;

  const {
    title,
    altImage,
    lead,
    content,
    authors,
    imageFile,
    loading,
    changeImage,
    getTitle,
    getAltImage,
    getLead,
    getContent,
    getAuthors,
    getImageFile,
    getChangeImage,
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

    if (content === "") {
      alert("Escribe el cuerpo de la noticia!");
      return;
    }

    getLoading(true);

    const editedArticle = {
      title,
      image,
      altImage,
      lead,
      content,
      authors,
      authorsIds,
    };

    if (changeImage) {
      if (!imageFile) {
        alert("Sube una imagen!");
        return;
      }

      let formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "elvillanense");

      const { secure_url } = await uploadImage(formData);

      // if (!response.ok) {
      //   alert("Ocurrió un error. Inténtelo nuevamente");
      //   getLoading(false);
      //   return;
      // }

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
    <Form
      style={{ maxWidth: "1000px" }}
      onSubmit={handleSubmitEditArticle}
      className={styles.form}
    >
      <div className={styles.author_container}>
        {authors.map((author) => (
          <div key={author.id}>
            <div
              className={styles.author_img_name_container}
              style={
                author.anonymous ? { opacity: "0.2", userSelect: "none" } : {}
              }
            >
              <p>{authors.length > 1 ? "Autores:" : "Autor:"}</p>
              <AuthorImage image={author.image} name={author.name} />
              <p>{author.name}</p>
            </div>
            <label className={styles.author_label}>
              <input
                onChange={() => {
                  const updatedAuthors = authors.map((_author) =>
                    _author.id === author.id
                      ? { ..._author, anonymous: !_author.anonymous }
                      : _author
                  );
                  getAuthors(updatedAuthors);
                }}
                type="checkbox"
                checked={author.anonymous}
              />
              Anónimo
            </label>
          </div>
        ))}
      </div>
      <Label label="Título" required={true}>
        <Input
          id="title"
          required
          value={title}
          onChange={(e) => getTitle(e.target.value)}
        />
      </Label>
      {changeImage ? (
        <>
          <SelectImage imageFile={imageFile} getImageFile={getImageFile} />
          <Label
            label="Descripción corta de la imagen &#40;para personas no videntes&#41;"
            required={true}
          >
            <Input
              id="alt_image"
              required
              value={altImage}
              onChange={(e) => getAltImage(e.target.value)}
            />
          </Label>
        </>
      ) : (
        <div>
          <img src={image} alt={altImage} />
          <Button
            type="button"
            label="Cambiar imagen"
            onClick={() => {
              getChangeImage();
              getAltImage("");
            }}
          />
        </div>
      )}
      <Label label="Entrada" required={true}>
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
  );
}
