import { useEffect, useState } from "react";
import { getArticle } from "../services/articles";

// los nombres de los custom hooks no deben ser p.e. useFetchArticles xq en el futuro se podrìa usar otra cosa que no sea fetch pora obrener los articles. El custom hook debe ser una caja negra. Este cusum creo q debería tener un nombre como useUploadArticle aunque en un futuro puede que lo utilice tmb para editar el artículo
export default function useDashboardForm(articleId) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [altImage, setAltImage] = useState("");
  const [lead, setLead] = useState("");
  const [section, setSection] = useState("locales");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(null);

  const getArticleToEdit = async () => {
    const article = await getArticle({ articleId });
    setTitle(article.title);
    setImage(article.image);
    setAltImage(article.altImage);
    setLead(article.lead);
    setSection(article.section);
    setContent(article.content);
  };

  useEffect(() => {
    if (articleId) getArticleToEdit();
  }, []);

  return {
    title,
    image,
    altImage,
    lead,
    section,
    content,
    author,
    setTitle,
    setImage,
    setAltImage,
    setLead,
    setSection,
    setContent,
    setAuthor,
  };
}
