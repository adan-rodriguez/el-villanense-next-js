"use client";

import TinyMCE from "./TinyMCE";
import styles from "../styles/DashboardForm.module.css";
import { useRef } from "react";
import AuthorImage from "./AuthorImage";
import { handleSubmit } from "@/app/lib/utils";

export default function DashboardForm({
  articleId,
  title,
  image,
  altImage,
  lead,
  section,
  content,
  author,
  showAuthor,
  getTitle,
  getImage,
  getAltImage,
  getLead,
  getSection,
  getContent,
  getShowAuthor,
  imageFile,
  getImageFile,
  user,
}) {
  const inputFileRef = useRef();

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        await handleSubmit(e, {
          articleId,
          article: {
            title,
            image,
            altImage,
            lead,
            section,
            content,
            author: showAuthor ? (author ? author.name : user.name) : null,
          },
          imageFile,
        });
      }}
    >
      <div className={styles.form_author}>
        <div
          className={styles.author_img_name_container}
          style={!showAuthor ? { opacity: "0.2", userSelect: "none" } : {}}
        >
          <p>Autor:</p>
          <AuthorImage
            src={author ? author.image : user.image}
            author={author ? author.name : user.name}
            width={36}
            height={36}
          />
          <p>{author ? author.name : user.name}</p>
        </div>
        <div className={styles.author_checkbox_container}>
          <input
            onChange={(e) => getShowAuthor(!e.target.checked)}
            type="checkbox"
          />
          <p className={styles.author_label_checkbox}>
            {showAuthor
              ? "Marcá la casilla si preferís que la noticia no tenga autor"
              : "Desmarcá la casilla si preferís que la noticia tenga autor"}
          </p>
        </div>
      </div>
      <div>
        <label className={styles.form_label} htmlFor="title">
          Título
          <input
            className={styles.form_input}
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => getTitle(e.target.value)}
          />
        </label>
      </div>
      {image ? (
        <div>
          <p>Imagen</p>
          <img src={image} alt={altImage} className={styles.img_bbdd} />
          <button
            type="button"
            className={styles.btn_change_img}
            onClick={() => {
              getImage("");
              getAltImage("");
            }}
          >
            Cambiar imagen
          </button>
        </div>
      ) : (
        <>
          <div>
            <label className={styles.form_label} htmlFor="image">
              Imagen
              <input
                type="file"
                id="image"
                required
                onChange={(e) => getImageFile(e.target.files[0])}
                ref={inputFileRef}
                className={styles.input_img}
              />
            </label>
          </div>
          {imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
              alt={altImage}
              className={styles.img_blob}
            />
          ) : (
            <div className={styles.img_preview}>Previsualización de imagen</div>
          )}
        </>
      )}
      <div>
        <label className={styles.form_label} htmlFor="alt-image">
          Descripción corta de la imagen &#40;para personas no videntes&#41;
          <input
            className={styles.form_input}
            type="text"
            id="alt-image"
            required
            value={altImage}
            onChange={(e) => getAltImage(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className={styles.form_label} htmlFor="lead">
          Entrada
          <textarea
            className={styles.form_textarea}
            id="lead"
            required
            value={lead}
            onChange={(e) => getLead(e.target.value)}
            rows="4"
          />
        </label>
      </div>
      <div>
        <label className={styles.form_label} htmlFor="section">
          Sección
          <select
            className={styles.form_select}
            id="section"
            required
            value={section}
            onChange={(e) => getSection(e.target.value)}
          >
            <option value="locales">Locales</option>
            <option value="regionales">Regionales</option>
            <option value="provinciales">Provinciales</option>
            <option value="nacionales">Nacionales</option>
            <option value="internacionales">Internacionales</option>
          </select>
        </label>
      </div>
      <TinyMCE content={content} getContent={getContent} />
      {/* <RichTextEditor
        content={content}
        getContent={getContent}
      /> */}
      <button className={styles.form_btn} type="submit">
        {articleId ? "Editar artículo" : "Subir artículo"}
      </button>
    </form>
  );
}
