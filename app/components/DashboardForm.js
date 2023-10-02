"use client";

// import TinyMCE from "./TinyMCE";
import styles from "../styles/DashboardForm.module.css";
import { users } from "../utils/constants/users";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import RichEditorText from "./RichEditorText";

export default function DashboardForm({
  article,
  settersArticle,
  handleSubmit,
  isEditing,
  user,
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
        if (!article.image) {
          alert("No has cargado la imagen de la noticia. Artículo no subido");
          return;
        }
        if (process.env.NEXT_PUBLIC_ENV === "development") {
          alert("No se puede subir una noticia en modo desarrollo.");
        } else {
          e.target.inert = "true";
          handleSubmit();
          e.target.inert = "";
        }
      }}
    >
      {!isEditing && (
        <div className={styles.form.author}>
          <div
            className={styles.author_img_name_container}
            style={{ opacity: !article.author && "0.2" }}
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
          <Image
            src={imageFile ? URL.createObjectURL(imageFile) : article.image}
            alt={article.altImage}
            style={{
              objectFit: "cover",
              position: "relative",
              verticalAlign: "bottom",
              marginRight: "10px",
            }}
            width={256}
            height={170}
          />
          <button
            type="button"
            style={{
              padding: "5px 20px",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "1px",
              fontSize: "1rem",
            }}
            onClick={() => {
              settersArticle.setImage(""),
                settersArticle.setAltImage(""),
                setImageFile(null);
            }}
          >
            Cambiar imagen
          </button>
        </div>
      ) : (
        <div>
          <label className={styles.form_label} htmlFor="image">
            Imagen
            <input
              style={{
                display: `${imageFile ? "none" : "block"}`,
                width: "100%",
                fontFamily: "Poppins, sans-serif",
                letterSpacing: "1px",
                fontSize: "1rem",
                padding: "5px 0",
              }}
              type="file"
              name="image"
              id="image"
              required
              onChange={(e) => setImageFile(e.target.files[0])}
              ref={inputFileRef}
            />
          </label>
          {imageFile ? (
            <div
              style={{
                display: "grid",
                gridTemplateAreas: `"image image" "button1 button2"`,
                justifyContent: "start",
              }}
            >
              <Image
                style={{
                  objectFit: "cover",
                  gridArea: "image",
                }}
                src={URL.createObjectURL(imageFile)}
                alt={article.altImage}
                width={256}
                height={170}
              />
              <button
                type="button"
                style={{
                  border: "1px black solid",
                  width: "128px",
                  backgroundColor: "green",
                  gridArea: "button1",
                  padding: "5px 0",
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "1px",
                }}
                onClick={async () => {
                  let formData = new FormData();
                  formData.append("file", imageFile);
                  formData.append("upload_preset", "elvillanense");
                  try {
                    const res = await fetch(
                      "https://api.cloudinary.com/v1_1/dh4eh6jen/image/upload",
                      {
                        method: "POST",
                        body: formData,
                      }
                    );
                    const data = await res.json();
                    settersArticle.setImage(data.secure_url);
                    alert("Imagen subida a la base de datos con éxito");
                  } catch (error) {
                    alert("Ocurrió un error. Inténtalo nuevamente");
                  }
                }}
              >
                Elegir imagen
              </button>
              <button
                type="button"
                style={{
                  border: "1px black solid",
                  width: "128px",
                  backgroundColor: "red",
                  gridArea: "button2",
                  padding: "5px 0",
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "1px",
                }}
                onClick={() => {
                  (inputFileRef.current.value = ""), setImageFile(null);
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div
              className="w-64 h-64 flex justify-center items-center border"
              style={{
                width: "256px",
                aspectRatio: "3/2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid black",
                fontSize: "10px",
                textAlign: "center",
                padding: "10px",
              }}
            >
              Previsualización de imagen
            </div>
          )}
        </div>
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
        {isEditing ? "Editar artículo" : "Subir artículo"}
      </button>
    </form>
  );
}
