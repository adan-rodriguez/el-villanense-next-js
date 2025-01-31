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
import { Article, Role } from "@/app/lib/types";
import { TrashIcon } from "@/app/ui/components/Icons";
import { useRef, useState } from "react";
import { getClientAuthors } from "@/app/lib/services/client/authors";
import { ConfirmModal } from "@/app/ui/components/ConfirmModal";

export function EditArticleClientPage({
  article,
  userId,
  role,
}: {
  article: Article;
  userId: string;
  role: Role;
}) {
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

  const deleteArticleModalRef = useRef<HTMLDialogElement>(null);

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
      authorsIds: authors.map((author) => author.id),
    };

    if (changeImage) {
      if (!imageFile) {
        alert("Sube una imagen!");
        return;
      }

      const imageUrl = await uploadImage(imageFile);

      // if (!response.ok) {
      //   alert("Ocurrió un error. Inténtelo nuevamente");
      //   getLoading(false);
      //   return;
      // }

      editedArticle.image = imageUrl;
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

  return (
    <Form
      style={{ maxWidth: "1000px" }}
      onSubmit={handleSubmitEditArticle}
      className={styles.form}
    >
      <fieldset
        style={{ paddingBlock: "0.35em 0.625em", paddingInline: "0.75em" }}
      >
        <legend style={{ paddingInline: "2px" }}>
          <small>{authors.length > 1 ? "Autores" : "Autor"}</small>
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
                _author.anonymous ? { opacity: "0.2", userSelect: "none" } : {}
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
            {(_author.id !== userId || role === "superadmin") && (
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

                  getAuthors(authors.filter((author) => author.nick !== nick));
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
              const _authors = await getClientAuthors();
              const filteredAuthors = _authors.filter(
                (_author) =>
                  authors.findIndex((author) => author.id === _author.id) === -1
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
          id="title"
          required
          value={title}
          onChange={(e) => getTitle(e.target.value)}
        />
      </Label>
      <fieldset
        style={{ paddingBlock: "0.35em 0.625em", paddingInline: "0.75em" }}
      >
        <legend style={{ paddingInline: "2px" }}>
          <small>Imagen</small>
        </legend>
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
            <img
              src={image}
              alt={altImage}
              style={{
                width: "100%",
                maxWidth: "400px",
                aspectRatio: "3/2",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
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
      </fieldset>
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
          onClick={() => deleteArticleModalRef.current?.showModal()}
        />
        <ConfirmModal
          ref={deleteArticleModalRef}
          text="¿Estás seguro deseas eliminar la noticia?"
          onClose={async (e) => {
            if (e.currentTarget.returnValue === "cancel") return;
            await handleDelete();
          }}
        />
      </div>
    </Form>
  );
}
