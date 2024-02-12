"use client";

import useEditArticle from "@/app/hooks/useEditArticle";
import styles from "@/app/ui/styles/ArticleForm.module.css";
// import { useContext } from "react";
// import { AuthContext } from "@/app/context/auth";
import {
  handleDelete,
  handleDropFile,
  handleFileChange,
  handleSubmitEditArticle,
  users,
  // objCompare,
} from "@/app/lib/utils";
import TinyMCE from "@/app/ui/components/TinyMCE";
import AuthorImage from "@/app/ui/components/AuthorImage";
import { useRouter } from "next/navigation";
import Asterisk from "@/app/ui/components/Asterisk";
import Button from "@/app/ui/components/Button";

export default function EditArticleClientPage({ article }) {
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
  } = useEditArticle({ article });

  const router = useRouter();

  // const { user } = useContext(AuthContext);

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

  return (
    <>
      <h2 className={styles.title}>Editar artículo</h2>
      <form
        onSubmit={async (e) => {
          await handleSubmitEditArticle({
            e,
            router,
            articleId: article.id,
            article: {
              title,
              image,
              altImage,
              lead,
              section: section || null,
              content,
              authors,
              anonymous,
            },
            imageFile,
            getLoading,
          });
        }}
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
        <label>
          Título
          <Asterisk />
          <input
            className={styles.input}
            type="text"
            required
            value={title}
            onChange={(e) => getTitle(e.target.value)}
          />
        </label>
        <label className="btn" style={{ alignSelf: "flex-start" }}>
          Seleccionar imagen
          <Asterisk />
          <input
            type="file"
            onChange={(e) => handleFileChange({ e, getImageFile, getAltImage })}
            accept=".jpg, .jpeg, .png, .svg, .webp"
            className={styles.img_input}
          />
        </label>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDropFile({ e, getImageFile, getAltImage })}
          className={styles.dropzone}
        >
          <div
            style={{
              backgroundImage: imageFile
                ? `url(${URL.createObjectURL(imageFile)})`
                : `url(${image})`,
            }}
            className={styles.image_preview}
          />
        </div>
        <label>
          Descripción corta de la imagen &#40;para personas no videntes&#41;
          <Asterisk />
          <input
            className={styles.input}
            type="text"
            required
            value={altImage}
            onChange={(e) => getAltImage(e.target.value)}
          />
        </label>
        <label>
          Entrada
          <Asterisk />
          <textarea
            className={styles.textarea}
            required
            value={lead}
            onChange={(e) => getLead(e.target.value)}
            rows="4"
          />
        </label>
        <label>
          Sección
          <select
            className={styles.select}
            value={section}
            onChange={(e) => getSection(e.target.value)}
          >
            <option value="">--Seleccionar--</option>
            <option value="locales">Locales</option>
            <option value="regionales">Regionales</option>
            <option value="provinciales">Provinciales</option>
            <option value="nacionales">Nacionales</option>
            <option value="internacionales">Internacionales</option>
          </select>
        </label>
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
            onClick={() => handleDelete({ articleId: article.id })}
          />
        </div>
      </form>
      {loading && <p className={styles.editing}>Editando...</p>}
    </>
  );
}
