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
import { Article, Role } from "@/app/lib/types";
import { Button } from "@/app/ui/components/Button";
import { useState } from "react";
import { getClientAuthors } from "@/app/lib/services/client/authors";
import { TrashIcon } from "@/app/ui/components/Icons";
import { z } from "zod";

export function NewArticleClientPage({
  author,
  role,
}: {
  author: {
    id: string;
    nick: string;
    name: string;
    image: string | null;
    anonymous: false;
  };
  role: Role;
}) {
  const {
    title,
    getTitle,
    lead,
    getLead,
    altImage,
    getAltImage,
    content,
    getContent,
    authors,
    getAuthors,
    imageFile,
    getImageFile,
    loading,
    getLoading,
    errorMessage,
    getErrorMessage,
    router,
  } = useNewArticle(author);

  const [showAddAuthorsBtn, setShowAddAuthorsBtn] = useState(true);

  const [otherAuthors, setOtherAuthors] = useState<
    {
      id: string;
      nick: string;
      name: string;
      image: string | null;
      anonymous: boolean;
    }[]
  >([]);

  // const isCompleted =
  //   Boolean(title) &&
  //   Boolean(altImage) &&
  //   Boolean(lead) &&
  //   Boolean(section) &&
  //   Boolean(content) &&
  //   Boolean(imageFile);

  async function handleSubmitNewArticle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    getLoading(true);
    getErrorMessage(null);

    const { data, error, success } = z
      .object({
        title: z.string().trim().nonempty("Escribe un título para la noticia"),
        lead: z.string().trim().nonempty("Escribe la entrada de la noticia"),
        altImage: z
          .string()
          .trim()
          .nonempty("Escribe un texto alternativo para la imagen"),
        content: z.string().trim().nonempty("Escribe el cuerpo de la noticia"),
        authors: z.array(
          z.object({
            id: z.string(),
            nick: z.string(),
            name: z.string(),
            image: z.string().nullish(),
            anonymous: z.boolean(),
          })
        ),
      })
      .safeParse({
        title,
        lead,
        altImage,
        content,
        authors,
      });

    if (!success) {
      getLoading(false);
      getErrorMessage(error.errors[0].message);
      return;
    }

    if (!(imageFile instanceof File)) {
      getLoading(false);
      getErrorMessage("Sube una imagen para la noticia!");
      return;
    }

    let response;
    try {
      const imageUrl = await uploadImage(imageFile);

      response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
          ...data,
        }),
      });
    } catch (error) {
      getLoading(false);
      getErrorMessage("Ocurrió un error. Intenta nuevamente más tarde.");
      return;
    }

    if (response.status === 400) {
      const { error } = await response.json();
      getLoading(false);
      getErrorMessage(error.message);
      return;
    }

    if (response.status !== 201) {
      getLoading(false);
      getErrorMessage("Ocurrió un error. Intenta nuevamente más tarde.");
      return;
    }

    alert("Noticia publicada con éxito!");
    getLoading(false);
    getErrorMessage(null);

    const article: Article = await response.json();

    router.push(`/${article.id}`);
  }

  return (
    <>
      <Form style={{ maxWidth: "1000px" }} onSubmit={handleSubmitNewArticle}>
        <fieldset>
          <legend style={{ fontSize: "smaller" }}>
            {authors.length > 1 ? "Autores" : "Autor"}
          </legend>
          {authors.map((_author) => (
            <div
              key={_author.id}
              className={styles.author_container}
              style={{ marginBlock: "0.5rem" }}
            >
              <div
                className={styles.author_img_name_container}
                style={
                  _author.anonymous
                    ? { opacity: "0.2", userSelect: "none" }
                    : {}
                }
              >
                <AuthorImage image={_author.image} name={_author.name} />
                <p>{_author.name}</p>
              </div>
              <label className={styles.author_label}>
                <input
                  onChange={() => {
                    const updatedAuthors = authors.map((__author) =>
                      __author.id === _author.id
                        ? { ...__author, anonymous: !__author.anonymous }
                        : __author
                    );
                    getAuthors(updatedAuthors);
                  }}
                  type="checkbox"
                  checked={_author.anonymous}
                />
                Anónimo
              </label>
              {(_author.id !== author.id || role === "superadmin") &&
                authors.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => {
                      const { nick } = _author;

                      const clickedAuthor = authors.find(
                        (author) => author.nick === nick
                      );

                      if (!clickedAuthor) return;

                      clickedAuthor.anonymous = false;

                      setOtherAuthors([...otherAuthors, clickedAuthor]);

                      getAuthors(
                        authors.filter((author) => author.nick !== nick)
                      );
                    }}
                    style={{ display: "flex", padding: "5px" }}
                  >
                    <TrashIcon />
                  </Button>
                )}
            </div>
          ))}

          {showAddAuthorsBtn ? (
            <Button
              type="button"
              label="Agregar autor"
              onClick={async () => {
                const authors = await getClientAuthors();
                const filteredAuthors = authors.filter(
                  (_author) => _author.id !== author.id
                );
                const mappedAuthors = filteredAuthors.map((author) => ({
                  id: author.id,
                  nick: author.nick,
                  name: author.name,
                  image: author.image,
                  anonymous: false,
                }));
                setOtherAuthors(mappedAuthors);
                setShowAddAuthorsBtn(false);
              }}
            />
          ) : (
            <select
              onChange={(e) => {
                const nick = e.target.value;

                // Encontrar el usuario seleccionado en el array de disponibles
                const selectedAuthor = otherAuthors.find(
                  (author) => author.nick === nick
                );

                if (!selectedAuthor) return;

                // Mover el usuario al array de seleccionados
                getAuthors([...authors, selectedAuthor]);

                // Eliminar el usuario del array de disponibles
                setOtherAuthors(
                  otherAuthors.filter((author) => author.nick !== nick)
                );
              }}
              style={{
                width: "100%",
                border: "1px solid gray",
                padding: "5px 10px",
                borderRadius: "2px",
                textOverflow: "ellipsis",
              }}
            >
              {otherAuthors.length > 0 ? (
                <option value="">-- Selecciona otro autor --</option>
              ) : (
                <option value="">-- No hay más autores --</option>
              )}
              {otherAuthors.map((otherAuthor) => (
                <option key={otherAuthor.id} value={otherAuthor.nick}>
                  {otherAuthor.name}
                </option>
              ))}
            </select>
          )}
        </fieldset>

        <Label label="Título" required={true}>
          <Input
            required
            value={title}
            onChange={(e) => getTitle(e.currentTarget.value)}
          />
        </Label>

        <fieldset
          style={{ paddingBlock: "0.35em 0.625em", paddingInline: "0.75em" }}
        >
          <legend style={{ paddingInline: "2px" }}>Imagen</legend>

          <SelectImage imageFile={imageFile} getImageFile={getImageFile} />

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
        </fieldset>

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

        {/* <Button
            type="submit"
            label="Subir artículo"
            // disabled={!isCompleted}
            // style={!isCompleted ? { cursor: "not-allowed" } : {}}
            // title={!isCompleted ? "Faltan completar campos" : ""}
          /> */}
        <Button label="Subir artículo" type="submit" disabled={loading} />
      </Form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
}
