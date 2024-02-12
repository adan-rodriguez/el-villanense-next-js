import { useEffect, useState } from "react";

export default function useEditArticle({ article }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [altImage, setAltImage] = useState("");
  const [lead, setLead] = useState("");
  const [section, setSection] = useState(null);
  const [content, setContent] = useState("");
  const [authors, setAuthors] = useState([]);
  const [anonymous, setAnonymous] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTitle = (title) => setTitle(title);
  const getImage = (image) => setImage(image);
  const getAltImage = (altImage) => setAltImage(altImage);
  const getLead = (lead) => setLead(lead);
  const getSection = (section) => setSection(section);
  const getContent = (content) => setContent(content);
  const getAnonymous = (bool) => setAnonymous(bool);
  const getImageFile = (imageFile) => setImageFile(imageFile);
  const getLoading = (bool) => setLoading(bool);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setImage(article.image);
      setAltImage(article.altImage);
      setLead(article.lead);
      setSection(article.section);
      setContent(article.content);
      setAuthors(article.authors);
      setAnonymous(article.anonymous);
    }
  }, []);

  return {
    title,
    image,
    altImage,
    lead,
    section,
    content,
    authors,
    anonymous,
    getTitle,
    getImage,
    getAltImage,
    getLead,
    getSection,
    getContent,
    getAnonymous,
    imageFile,
    getImageFile,
    loading,
    getLoading,
  };
}
