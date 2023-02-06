"use client";

import TinyMCE from "./TinyMCE";
import styles from "./AdminForm.module.css";

export default function AdminForm({ article, settersArticle, addArticle }) {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        addArticle();
      }}
    >
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
        Subir artículo
      </button>
    </form>
  );
}
