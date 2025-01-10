"use client";

import styles from "@/app/ui/styles/ArticleForm.module.css";
import { TinyMCE } from "@/app/ui/components/TinyMCE";
import { AuthorImage } from "@/app/ui/components/AuthorImage";
import { useNewArticle } from "@/app/hooks/useNewArticle";
import { Form } from "@/app/ui/components/Form";
import { Label } from "@/app/ui/components/Label";
import { Input } from "@/app/ui/components/Input";
import { SelectImage } from "@/app/ui/components/SelectImage";
import { uploadImage } from "@/app/lib/server-actions";
import { Article } from "@/app/lib/types";
import { Button } from "@/app/ui/components/Button";

export function NewArticleClientPage({
  author,
}: {
  author: {
    id: string;
    nick: string;
    name: string;
    image: string | null;
    anonymous: false;
  };
}) {
  const {
    title,
    altImage,
    lead,
    content,
    authors,
    imageFile,
    loading,
    getTitle,
    getAltImage,
    getLead,
    getContent,
    getAuthors,
    getImageFile,
    getLoading,
    router,
  } = useNewArticle(author);

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

    const { secure_url } = await uploadImage(formData);

    // if (!response.ok) {
    //   alert("Ocurrió un error. Inténtelo nuevamente");
    //   getLoading(false);
    //   return;
    // }

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
        authors,
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
    <Form style={{ maxWidth: "1000px" }} onSubmit={handleSubmitNewArticle}>
      <div>
        {authors.map((author) => (
          <div key={author.id} className={styles.author_container}>
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
          required
          value={title}
          onChange={(e) => getTitle(e.currentTarget.value)}
        />
      </Label>
      <SelectImage imageFile={imageFile} getImageFile={getImageFile} />
      {/* <DragAndDrop
          allowedImageFileTypes={allowedImageFileTypes}
          getImageFile={getImageFile}
          externalImageFile={imageFile}
        /> */}
      <Label
        label="Descripción corta de la imagen &#40;para personas no videntes&#41;"
        required={true}
      >
        <Input
          required
          value={altImage}
          onChange={(e) => getAltImage(e.currentTarget.value)}
        />
      </Label>
      <Label label="Entrada" required={true}>
        <textarea
          className={styles.textarea}
          required
          value={lead}
          onChange={(e) => getLead(e.currentTarget.value)}
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
  );
}
