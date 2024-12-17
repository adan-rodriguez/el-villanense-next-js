"use client";

import styles from "@/app/ui/styles/ArticleForm.module.css";
import TinyMCE from "@/app/ui/components/TinyMCE";
import { selectSectionOptions } from "@/app/lib/utils";
import AuthorImage from "@/app/ui/components/AuthorImage";
import useNewArticle from "@/app/hooks/useNewArticle";
import Asterisk from "@/app/ui/components/Asterisk";
import Form from "@/app/ui/components/Form";
import Label from "@/app/ui/components/Label";
import Input from "@/app/ui/components/Input";
import SelectImage from "@/app/ui/components/SelectImage";
import Select from "@/app/ui/components/Select";
import DragAndDrop from "@/app/ui/components/DragAndDrop";
import { addAction } from "@/app/lib/server-actions";
import { SubmitButton } from "@/app/ui/components/SubmitButton";

export default function NewArticlePage() {
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
    router,
    user,
  } = useNewArticle();

  // const isCompleted =
  //   Boolean(title) &&
  //   Boolean(altImage) &&
  //   Boolean(lead) &&
  //   Boolean(section) &&
  //   Boolean(content) &&
  //   Boolean(imageFile);

  async function handleSubmitNewArticle(e) {
    e.preventDefault();

    if (!imageFile) {
      alert("Sube una imagen!");
      return;
    }

    if (content === "") {
      alert("Escribe el cuerpo de la noticia!");
      return;
    }

    getLoading(true);

    let articleId;

    try {
      const { imageUrl } = await uploadImage();

      articleId = await addAction({
        article: {
          title,
          image: imageUrl,
          altImage,
          lead,
          section: section || null,
          content,
          authors,
          anonymous,
        },
      });
      alert("Artículo agregado con éxito!");
    } catch {
      alert("Ocurrió un error. Inténtelo nuevamente");
    } finally {
      getLoading(false);
    }

    router.push(`/${articleId}`);
  }

  async function uploadImage() {
    let formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "elvillanense");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dh4eh6jen/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const { secure_url } = await response.json();
    return { imageUrl: secure_url };
  }

  return (
    <>
      <h2 className={styles.title}>Nuevo artículo</h2>
      <Form style={{ maxWidth: "1000px" }} onSubmit={handleSubmitNewArticle}>
        <div className={styles.author_container}>
          <div
            className={styles.author_img_name_container}
            style={anonymous ? { opacity: "0.2", userSelect: "none" } : {}}
          >
            <p>Autor:</p>
            <AuthorImage src={user?.image} author={user?.name} />
            <p>{user?.name}</p>
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
        <SelectImage getImageFile={getImageFile} />
        <DragAndDrop
          allowedImageFileTypes={[
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/webp",
          ]}
          getImageFile={getImageFile}
          externalImageFile={imageFile}
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
          {/* <Button
            type="submit"
            label="Subir artículo"
            // disabled={!isCompleted}
            // style={!isCompleted ? { cursor: "not-allowed" } : {}}
            // title={!isCompleted ? "Faltan completar campos" : ""}
          /> */}
          <SubmitButton label="Subir artículo" />
        </div>
      </Form>
      {loading && <p className={styles.upload}>Subiendo...</p>}
    </>
  );
}
