import { useEffect, useState } from "react";

export default function useDashboardForm({ article } = {}) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [altImage, setAltImage] = useState("");
  const [lead, setLead] = useState("");
  const [section, setSection] = useState("locales");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(null);

  const [imageFile, setImageFile] = useState(null);

  const getTitle = (title) => setTitle(title);
  const getImage = (image) => setImage(image);
  const getAltImage = (altImage) => setAltImage(altImage);
  const getLead = (lead) => setLead(lead);
  const getSection = (section) => setSection(section);
  const getContent = (content) => setContent(content);
  const getAuthor = (author) => setAuthor(author);

  const getImageFile = (imageFile) => setImageFile(imageFile);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setImage(article.image);
      setAltImage(article.altImage);
      setLead(article.lead);
      setSection(article.section);
      setContent(article.content);
    }
  }, []);

  return {
    title,
    image,
    altImage,
    lead,
    section,
    content,
    author,
    getTitle,
    getImage,
    getAltImage,
    getLead,
    getSection,
    getContent,
    getAuthor,
    imageFile,
    getImageFile,
  };
}
