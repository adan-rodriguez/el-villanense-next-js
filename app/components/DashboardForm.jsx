"use client";

import TinyMCE from "./TinyMCE";
import styles from "./DashboardForm.module.css";
import { users } from "../utils/constants/users";

export default function DashboardForm({
  article,
  settersArticle,
  handleSubmit,
  isEditing,
  user,
}) {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        {article.author && (
          <div
            style={{ display: "flex", columnGap: "10px", alignItems: "center" }}
          >
            <p>Autor:</p>
            <img
              src={users[user]?.image}
              alt={users[user]?.name}
              width={36}
              height={36}
              style={{ borderRadius: "100%", objectFit: "cover" }}
            />
            <p>{users[user]?.name}</p>
          </div>
        )}
        <div>
          <label htmlFor="anonymous">Anónimo</label>
          <input
            onChange={(e) =>
              settersArticle.setAuthor(e.target.checked ? null : user)
            }
            type="checkbox"
            name="anonymous"
            id="anonymous"
          />
          <p>
            {!article.author
              ? "Desmarque ésta casilla si prefieres que la noticia tenga un autor"
              : "Marque ésta casilla si prefieres que la noticia no tenga un autor"}
          </p>
        </div>
      </div>
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
      <div>
        <label className={styles.form_label} htmlFor="image">
          Imagen
          <input
            className={styles.form_input}
            type="text"
            name="image"
            id="image"
            placeholder="URL Imagen"
            required
            value={article.image}
            onChange={(e) => settersArticle.setImage(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className={styles.form_label} htmlFor="alt-image">
          Texto alternativo de la imagen
          <input
            className={styles.form_input}
            type="text"
            name="alt-image"
            id="alt-image"
            placeholder="Introduce el texto alternativo..."
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
