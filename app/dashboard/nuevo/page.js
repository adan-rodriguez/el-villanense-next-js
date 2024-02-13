"use client";

import styles from "@/app/ui/styles/ArticleForm.module.css";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth";
import TinyMCE from "@/app/ui/components/TinyMCE";
import {
  handleDropFile,
  handleFileChange,
  handleSubmitNewArticle,
  selectSectionOptions,
} from "@/app/lib/utils";
import AuthorImage from "@/app/ui/components/AuthorImage";
import useNewArticle from "@/app/hooks/useNewArticle";
import { useRouter } from "next/navigation";
import Asterisk from "@/app/ui/components/Asterisk";
import Button from "@/app/ui/components/Button";
import Form from "@/app/ui/components/Form";
import Label from "@/app/ui/components/Label";
import Input from "@/app/ui/components/Input";
import SelectImage from "@/app/ui/components/SelectImage";
import Select from "@/app/ui/components/Select";
import DragAndDrop from "@/app/ui/components/DragAndDrop";

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
      <Form
        style={{ maxWidth: "1000px" }}
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
        <Label label="Título">
          <Asterisk />
          <Input
            id="title"
            required={true}
            value={title}
            onChange={(e) => getTitle(e.target.value)}
          />
        </Label>
        <SelectImage
          onChange={(e) => handleFileChange({ e, getImageFile, getAltImage })}
        />
        <DragAndDrop
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDropFile({ e, getImageFile, getAltImage })}
          imageFile={imageFile}
        />
        <Label label="Descripción corta de la imagen &#40;para personas no videntes&#41;">
          <Asterisk />
          <Input
            id="alt_image"
            required={true}
            value={altImage}
            onChange={(e) => getAltImage(e.target.value)}
          />
        </Label>
        <Label label="Entrada">
          <Asterisk />
          <textarea
            className={styles.textarea}
            required
            value={lead}
            onChange={(e) => getLead(e.target.value)}
            rows="4"
          />
        </Label>
        <Label label="Sección">
          <Select value={section} onChange={(e) => getSection(e.target.value)}>
            {selectSectionOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Label>
        <TinyMCE content={content} getContent={getContent} />
        {/* <RichTextEditor
        content={content}
        getContent={getContent}
      /> */}
        <div className={styles.buttons_container}>
          <Button
            type="submit"
            label="Subir artículo"
            // disabled={!isCompleted}
            // style={!isCompleted ? { cursor: "not-allowed" } : {}}
            // title={!isCompleted ? "Faltan completar campos" : ""}
          />
        </div>
      </Form>
      {loading && <p className={styles.upload}>Subiendo...</p>}
    </>
  );
}
