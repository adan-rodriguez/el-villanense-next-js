"use client";

import TinyMCE from "./TinyMCE";
import styles from "../styles/DashboardForm.module.css";
import { users } from "../utils/constants/users";
import { useEffect, useRef, useState } from "react";
// import RichTextEditor from "./RichTextEditor";
import { addArticle } from "../utils/addArticle";
import { editArticle } from "../utils/editArticle";

export default function DashboardForm({ article, user, articleId }) {
  const [imageFile, setImageFile] = useState(null);

  const inputFileRef = useRef();

  let editor;

  if (user) editor = users.find((_user) => _user.email === user);

  useEffect(() => {
    if (editor) article.setAuthor(editor.name);
  }, []);

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();
        if (process.env.NEXT_PUBLIC_ENV === "development") {
          alert("No se puede subir una noticia en modo desarrollo.");
          return;
        }

        e.target.inert = "true";
        let image = article.image;

        try {
          if (imageFile) {
            let formData = new FormData();
            formData.append("file", imageFile);
            formData.append("upload_preset", "elvillanense");
            const res = await fetch(
              "https://api.cloudinary.com/v1_1/dh4eh6jen/image/upload",
              {
                method: "POST",
                body: formData,
              }
            );
            const { secure_url } = await res.json();
            image = secure_url;
          }

          if (!articleId) {
            addArticle({ article, image });
            alert("Artículo subido con éxito");
          } else {
            editArticle({ articleId, article, image });
            alert("Artículo editado con éxito");
          }
        } catch {
          alert("Ocurrió un error. Inténtelo nuevamente");
        }

        e.target.inert = "";
      }}
    >
      {!articleId && (
        <div className={styles.form_author}>
          <div
            className={styles.author_img_name_container}
            style={
              !article.author ? { opacity: "0.2", userSelect: "none" } : {}
            }
          >
            <p>Autor:</p>
            <img
              src={editor.image}
              alt={`Foto de ${editor.name}`}
              width={36}
              height={36}
              className={styles.author_img}
            />
            <p>{editor.name}</p>
          </div>
          <div className={styles.author_checkbox_container}>
            <input
              onChange={(e) =>
                article.setAuthor(e.target.checked ? null : editor.name)
              }
              type="checkbox"
            />
            <p className={styles.author_label_checkbox}>
              {article.author
                ? "Marcá la casilla si preferís que la noticia no tenga autor"
                : "Desmarcá la casilla si preferís que la noticia tenga autor"}
            </p>
          </div>
        </div>
      )}
      <div>
        <label className={styles.form_label} htmlFor="title">
          Título
          <input
            className={styles.form_input}
            type="text"
            name="title"
            id="title"
            placeholder="Título"
            required
            value={article.title}
            onChange={(e) => article.setTitle(e.target.value)}
          />
        </label>
      </div>
      {article.image ? (
        <div>
          <p>Imagen</p>
          <img
            src={article.image}
            alt={article.altImage}
            width={256}
            height={170}
            className={styles.img_bbdd}
          />
          <button
            type="button"
            className={styles.btn_change_img}
            onClick={() => {
              article.setImage("");
              article.setAltImage("");
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
                name="image"
                id="image"
                required
                onChange={(e) => setImageFile(e.target.files[0])}
                ref={inputFileRef}
                className={styles.input_img}
              />
            </label>
          </div>
          {imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
              alt={article.altImage}
              width={256}
              height={170}
              className={styles.img_blob}
            />
          ) : (
            <div className={styles.img_preview}>Previsualización de imagen</div>
          )}
        </>
      )}
      <div>
        <label className={styles.form_label} htmlFor="alt-image">
          Texto alternativo de la imagen
          <input
            className={styles.form_input}
            type="text"
            name="alt-image"
            id="alt-image"
            placeholder="Introduce una descripción corta de la imagen..."
            required
            value={article.altImage}
            onChange={(e) => article.setAltImage(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className={styles.form_label} htmlFor="lead">
          Entrada
          <textarea
            className={styles.form_textarea}
            type="text"
            name="lead"
            id="lead"
            placeholder="Entrada"
            required
            value={article.lead}
            onChange={(e) => article.setLead(e.target.value)}
            rows="4"
          />
        </label>
      </div>
      <div>
        <label className={styles.form_label} htmlFor="section">
          Sección
          <select
            className={styles.form_select}
            name="section"
            id="section"
            required
            value={article.section}
            onChange={(e) => article.setSection(e.target.value)}
          >
            <option value="locales">Locales</option>
            <option value="regionales">Regionales</option>
            <option value="provinciales">Provinciales</option>
            <option value="nacionales">Nacionales</option>
            <option value="internacionales">Internacionales</option>
          </select>
        </label>
      </div>
      <TinyMCE content={article.content} setContent={article.setContent} />
      {/* <RichTextEditor
        content={article.content}
        setContent={article.setContent}
      /> */}
      <button className={styles.form_btn} type="submit">
        {articleId ? "Editar artículo" : "Subir artículo"}
      </button>
    </form>
  );
}
