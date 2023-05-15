import TinyMCE from "./TinyMCE";
import styles from "../styles/DashboardForm.module.css";
import { users } from "../utils/constants/users";
import { useEffect, useRef, useState } from "react";

export default function DashboardForm({
  article,
  settersArticle,
  handleSubmit,
  isEditing,
  user,
}) {
  const [imageFile, setImageFile] = useState(null);

  const inputFileRef = useRef();

  useEffect(() => {
    settersArticle.setAuthor(user);
  }, []);

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {!isEditing && (
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "20px" }}
        >
          <div
            style={{
              display: "flex",
              columnGap: "10px",
              alignItems: "center",
              opacity: !article.author && "0.2",
            }}
          >
            <p>Autor:</p>
            <img
              src={users[user]?.image}
              alt={`Foto de ${users[user]?.name}`}
              width={36}
              height={36}
              style={{ borderRadius: "100%", objectFit: "cover" }}
            />
            <p>{users[user]?.name}</p>
          </div>
          <div style={{ display: "flex", columnGap: "5px" }}>
            <input
              onChange={(e) =>
                settersArticle.setAuthor(e.target.checked ? null : user)
              }
              type="checkbox"
              name="anonymous"
              id="anonymous"
            />
            <p
              style={{
                fontSize: "12px",
                opacity: "0.8",
              }}
            >
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
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : article.image}
            alt={article.altImage}
            style={{
              aspectRatio: "3/2",
              objectFit: "cover",
              position: "relative",
              verticalAlign: "bottom",
              marginRight: "10px",
            }}
            width={256}
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
              <img
                style={{
                  aspectRatio: "3/2",
                  objectFit: "cover",
                  gridArea: "image",
                }}
                src={URL.createObjectURL(imageFile)}
                alt={article.altImage}
                width={256}
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
                  const res = await fetch(
                    "https://api.cloudinary.com/v1_1/dh4eh6jen/image/upload",
                    {
                      method: "POST",
                      body: formData,
                    }
                  );
                  const data = await res.json();
                  // settersArticle.setImage((image) => image + data.secure_url);
                  settersArticle.setImage(data.secure_url);
                  alert("Imagen subida a la base de datos con éxito");
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
      <TinyMCE
        getContentTiny={settersArticle.getContentTiny}
        initialValue={article.content}
      />
      <button className={styles.form_btn} type="submit">
        {isEditing ? "Editar artículo" : "Subir artículo"}
      </button>
    </form>
  );
}
