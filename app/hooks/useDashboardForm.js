import { useEffect, useState } from "react";

export default function useDashboardForm(article) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [altImage, setAltImage] = useState("");
  const [lead, setLead] = useState("");
  const [section, setSection] = useState("locales");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(null);

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
    setTitle,
    setImage,
    setAltImage,
    setLead,
    setSection,
    setContent,
    setAuthor,
  };
}
