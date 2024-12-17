"use client";

import { useEditArticle } from "@/app/hooks/useEditArticle";
import styles from "@/app/ui/styles/ArticleForm.module.css";
import {
  selectSectionOptions,
  users,
  // objCompare,
} from "@/app/lib/utils";
import TinyMCE from "@/app/ui/components/TinyMCE";
import AuthorImage from "@/app/ui/components/AuthorImage";
import Asterisk from "@/app/ui/components/Asterisk";
import Button from "@/app/ui/components/Button";
import Label from "@/app/ui/components/Label";
import Input from "@/app/ui/components/Input";
import SelectImage from "@/app/ui/components/SelectImage";
import Form from "@/app/ui/components/Form";
import Select from "@/app/ui/components/Select";
import DragAndDrop from "@/app/ui/components/DragAndDrop";
import { deleteAction, editAction } from "@/app/lib/server-actions";

export function EditArticleClientPage({ article }) {
  const { articleId } = article;

  const {
    title,
    image,
    altImage,
    lead,
    section,
    content,
    authors,
    anonymous,
    getTitle,
    getAltImage,
    getLead,
    getSection,
    getContent,
    getAnonymous,
    imageFile,
    getImageFile,
    loading,
    getLoading,
    router,
  } = useEditArticle({ article });

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

  async function handleSubmitEditArticle(e) {
    e.preventDefault();
    getLoading(true);

    const editedArticle = {
      articleId,
      title,
      image,
      altImage,
      lead,
      section: section || null,
      content,
      authors,
      anonymous,
    };

    try {
      if (imageFile) {
        const { imageUrl } = await uploadImage();
        editedArticle.image = imageUrl;
      }
      await editAction({ article: editedArticle });
    } catch {
      alert("Ocurrió un error. Inténtelo nuevamente");
      return;
    } finally {
      getLoading(false);
    }

    router.push(`/${articleId}`);
  }

  async function uploadImage() {
    let formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "elvillanense");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dh4eh6jen/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const { secure_url } = await response.json();
    return { imageUrl: secure_url };
  }

  async function handleDelete({ articleId }) {
    if (confirm("¿Estás seguro de borrar esta noticia?")) {
      try {
        await deleteAction({ articleId });
        alert("Noticia eliminada con éxito");
      } catch {
        alert("No se ha podido eliminar la noticia");
      }
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
                  <AuthorImage src={author.image} author={author.name} />
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
          <Asterisk />
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
          <Asterisk />
          <Input
            id="alt_image"
            required={true}
            value={altImage}
            onChange={(e) => getAltImage(e.target.value)}
          />
        </Label>
        <Label label="Entrada">
          <Asterisk />
          <textarea
            className={styles.textarea}
            required
            value={lead}
            onChange={(e) => getLead(e.target.value)}
            rows="4"
          />
        </Label>
        <Label label="Sección">
          <Select value={section} onChange={(e) => getSection(e.target.value)}>
            {selectSectionOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Label>
        <TinyMCE content={content} getContent={getContent} />
        {/* <RichTextEditor
        content={content}
        getContent={getContent}
      /> */}
        <div className={styles.buttons_container}>
          <Button
            type="submit"
            label="Editar artículo"
            // disabled={isNotEdited}
            // style={isNotEdited ? { cursor: "not-allowed" } : {}}
            // title={isNotEdited? "El artículo no tiene cambios" : {}}
          />
          <Button
            label="Borrar artículo"
            onClick={async () => await handleDelete({ articleId })}
          />
        </div>
      </Form>
      {loading && <p className={styles.editing}>Editando...</p>}
    </>
  );
}
