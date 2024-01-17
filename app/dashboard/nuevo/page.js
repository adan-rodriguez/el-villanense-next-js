"use client";

import styles from "@/app/ui/styles/DashboardForm.module.css";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth";
import TinyMCE from "@/app/ui/components/TinyMCE";
import { handleSubmitNewArticle } from "@/app/lib/utils";
import AuthorImage from "@/app/ui/components/AuthorImage";
import useNewArticle from "@/app/hooks/useNewArticle";
import { useRouter } from "next/navigation";

export default function NewArticlePage() {
  const { user } = useContext(AuthContext);

  const {
    title,
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
  } = useNewArticle({ user });

  const router = useRouter();

  // const isCompleted =
  //   Boolean(title) &&
  //   Boolean(altImage) &&
  //   Boolean(lead) &&
  //   Boolean(section) &&
  //   Boolean(content) &&
  //   Boolean(imageFile);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Nuevo artículo</h2>
      <form
        className={styles.form}
        onSubmit={async (e) => {
          const newArticle = await handleSubmitNewArticle(e, {
            article: {
              title,
              altImage,
              lead,
              section,
              content,
              authors,
              anonymous,
            },
            imageFile,
          });

          router.push(`/${newArticle.id}`);
        }}
      >
        <div className={styles.form_author}>
          <div
            className={styles.author_img_name_container}
            style={anonymous ? { opacity: "0.2", userSelect: "none" } : {}}
          >
            <p>Autor:</p>
            <AuthorImage src={user.image} author={user.name} />
            <p>{user.name}</p>
          </div>
          <div className={styles.author_checkbox_container}>
            <input
              onChange={(e) => getAnonymous(e.target.checked)}
              type="checkbox"
            />
            <p className={styles.author_label_checkbox}>
              {!anonymous
                ? "Marcá la casilla si preferís que la noticia no tenga autor"
                : "Desmarcá la casilla si preferís que la noticia tenga autor"}
            </p>
          </div>
        </div>
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
          <div className={styles.img_preview}>Previsualización de imagen</div>
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
            // disabled={!isCompleted}
            // style={!isCompleted ? { cursor: "not-allowed" } : {}}
            // title={!isCompleted ? "Faltan completar campos" : ""}
          >
            Subir artículo
          </button>
        </div>
      </form>
    </>
  );
}
