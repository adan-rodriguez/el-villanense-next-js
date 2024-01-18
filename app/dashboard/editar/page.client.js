"use client";

import useEditArticle from "@/app/hooks/useEditArticle";
import styles from "@/app/ui/styles/DashboardForm.module.css";
// import { useContext } from "react";
// import { AuthContext } from "@/app/context/auth";
import {
  handleDelete,
  handleSubmitEditArticle,
  users,
  // objCompare,
} from "@/app/lib/utils";
import TinyMCE from "@/app/ui/components/TinyMCE";
import AuthorImage from "@/app/ui/components/AuthorImage";

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
    getImage,
    getAltImage,
    getLead,
    getSection,
    getContent,
    getAnonymous,
    imageFile,
    getImageFile,
  } = useEditArticle({ article });

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
      <h2 style={{ textAlign: "center" }}>Editar artículo</h2>
      <form
        className={styles.form}
        onSubmit={async (e) => {
          await handleSubmitEditArticle(e, {
            articleId: article.id,
            article: {
              title,
              image,
              altImage,
              lead,
              section,
              content,
              authors,
              anonymous,
            },
            imageFile,
          });
        }}
      >
        {authors && (
          <div className={styles.form_author}>
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
            <div className={styles.author_checkbox_container}>
              <input
                onChange={(e) => getAnonymous(e.target.checked)}
                type="checkbox"
                checked={anonymous}
              />
              <p className={styles.author_label_checkbox}>
                {!anonymous
                  ? "Marcá la casilla si preferís que la noticia no tenga autor"
                  : "Desmarcá la casilla si preferís que la noticia tenga autor"}
              </p>
            </div>
          </div>
        )}
        <div>
          <label className={styles.form_label}>
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
              <label className={styles.form_label}>
                Imagen
                <input
                  type="file"
                  id="image"
                  required
                  onChange={(e) => {
                    getImageFile(e.target.files[0]);
                  }}
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
              <div className={styles.img_preview}>
                Previsualización de imagen
              </div>
            )}
          </>
        )}
        <div>
          <label className={styles.form_label}>
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
          <label className={styles.form_label}>
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
          <label className={styles.form_label}>
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
        <div className={styles.buttons_container}>
          <button
            className={styles.form_btn}
            type="submit"
            // disabled={isNotEdited}
            // style={isNotEdited ? { cursor: "not-allowed" } : {}}
            // title={isNotEdited? "El artículo no tiene cambios" : {}}
          >
            Editar artículo
          </button>
          <button
            type="button"
            onClick={() => handleDelete({ articleId: article.id })}
            className={styles.form_btn}
          >
            Borrar artículo
          </button>
        </div>
      </form>
    </>
  );
}
