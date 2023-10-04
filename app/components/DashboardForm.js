"use client";

// import TinyMCE from "./TinyMCE";
import styles from "../styles/DashboardForm.module.css";
import { users } from "../utils/constants/users";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import RichEditorText from "./RichEditorText";
import { addArticle } from "../utils/addArticle";
import { editArticle } from "../utils/editArticle";

export default function DashboardForm({
  article,
  settersArticle,
  user,
  articleToEdit,
}) {
  const [imageFile, setImageFile] = useState(null);

  const inputFileRef = useRef();

  let editor;

  if (user) editor = users.find((_user) => _user.email === user);

  useEffect(() => {
    if (editor) settersArticle.setAuthor(editor.name);
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

          if (!articleToEdit) {
            addArticle(article, image);
            alert("Artículo subido con éxito");
          } else {
            editArticle(articleToEdit, article, image);
            alert("Artículo editado con éxito");
          }
        } catch {
          alert("Ocurrió un error. Inténtelo nuevamente");
        }

        e.target.inert = "";
      }}
    >
      {!articleToEdit && (
        <div className={styles.form_author}>
          <div
            className={styles.author_img_name_container}
            style={!article.author && { opacity: "0.2", userSelect: "none" }}
          >
            <p>Autor:</p>
            <Image
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
                settersArticle.setAuthor(e.target.checked ? null : editor.name)
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
            onChange={(e) => settersArticle.setTitle(e.target.value)}
          />
        </label>
      </div>
      {article.image ? (
        <div>
          <p>Imagen</p>
          <Image
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
              settersArticle.setImage("");
              settersArticle.setAltImage("");
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
            <Image
              src={URL.createObjectURL(imageFile)}
              alt={article.altImage}
              width={256}
              height={170}
              className={styles.img_blob}
            />
          ) : (
            <div>Previsualización de imagen</div>
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
            onChange={(e) => settersArticle.setAltImage(e.target.value)}
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
            onChange={(e) => settersArticle.setLead(e.target.value)}
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
            onChange={(e) => settersArticle.setSection(e.target.value)}
          >
            <option value="locales">Locales</option>
            <option value="regionales">Regionales</option>
            <option value="provinciales">Provinciales</option>
            <option value="nacionales">Nacionales</option>
            <option value="internacionales">Internacionales</option>
          </select>
        </label>
      </div>
      {/* <TinyMCE
        getContentTiny={settersArticle.getContentTiny}
        initialValue={article.content}
      /> */}
      <RichEditorText
        content={article.content}
        setContent={settersArticle.setContent}
      />
      <button className={styles.form_btn} type="submit">
        {articleToEdit ? "Editar artículo" : "Subir artículo"}
      </button>
    </form>
  );
}
