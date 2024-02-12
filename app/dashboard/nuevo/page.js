"use client";

import styles from "@/app/ui/styles/ArticleForm.module.css";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth";
import TinyMCE from "@/app/ui/components/TinyMCE";
import {
  handleDropFile,
  handleFileChange,
  handleSubmitNewArticle,
} from "@/app/lib/utils";
import AuthorImage from "@/app/ui/components/AuthorImage";
import useNewArticle from "@/app/hooks/useNewArticle";
import { useRouter } from "next/navigation";
import Asterisk from "@/app/ui/components/Asterisk";

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
    loading,
    getLoading,
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
      <h2 className={styles.title}>Nuevo artículo</h2>
      <form
        className={styles.form}
        onSubmit={async (e) => {
          await handleSubmitNewArticle({
            e,
            router,
            article: {
              title,
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
      >
        <div className={styles.author_container}>
          <div
            className={styles.author_img_name_container}
            style={anonymous ? { opacity: "0.2", userSelect: "none" } : {}}
          >
            <p>Autor:</p>
            <AuthorImage src={user.image} author={user.name} />
            <p>{user.name}</p>
          </div>
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
        <label className={styles.label}>
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
        <label className={`${styles.label} ${styles.img_label}`}>
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
                : "",
            }}
            className={styles.image_preview}
          >
            {!imageFile && (
              <>
                <p>O arrastra la imagen aquí </p>
                <svg width="24" height="24">
                  <path
                    d="M19 7v3h-2V7h-3V5h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12a2 2 0 002-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"
                    fill="gray"
                  ></path>
                </svg>
              </>
            )}
          </div>
        </div>
        <label className={styles.label}>
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
        <label className={styles.label}>
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
        <label className={styles.label}>
          Sección
          <select
            value={section}
            onChange={(e) => getSection(e.target.value)}
            className={styles.select}
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
          <button
            className={styles.btn}
            type="submit"
            // disabled={!isCompleted}
            // style={!isCompleted ? { cursor: "not-allowed" } : {}}
            // title={!isCompleted ? "Faltan completar campos" : ""}
          >
            Subir artículo
          </button>
        </div>
      </form>
      {loading && <p className={styles.upload}>Subiendo...</p>}
    </>
  );
}
