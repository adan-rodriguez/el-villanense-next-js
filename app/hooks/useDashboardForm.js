import { useEffect, useState } from "react";
import { users } from "../lib/utils";

export default function useDashboardForm({ article } = {}) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [altImage, setAltImage] = useState("");
  const [lead, setLead] = useState("");
  const [section, setSection] = useState("locales");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(null);
  const [showAuthor, setShowAuthor] = useState(true);

  const [imageFile, setImageFile] = useState(null);

  const getTitle = (title) => setTitle(title);
  const getImage = (image) => setImage(image);
  const getAltImage = (altImage) => setAltImage(altImage);
  const getLead = (lead) => setLead(lead);
  const getSection = (section) => setSection(section);
  const getContent = (content) => setContent(content);
  const getShowAuthor = (bool) => setShowAuthor(bool);

  const getImageFile = (imageFile) => setImageFile(imageFile);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setImage(article.image);
      setAltImage(article.altImage);
      setLead(article.lead);
      setSection(article.section);
      setContent(article.content);
      const editor = users.find((_user) => _user.name === article.author);
      setAuthor(editor);
      setShowAuthor(Boolean(article.author));
    }
  }, []);

  // useEffect(() => {
  //   const newArticle = {
  //     title,
  //     image,
  //     altImage,
  //     lead,
  //     section,
  //     content,
  //     showAuthor,
  //   };
  //   window.sessionStorage.setItem("article", JSON.stringify(newArticle));
  // }, [title, image, altImage, lead, section, content, showAuthor]);

  return {
    title,
    image,
    altImage,
    lead,
    section,
    content,
    author,
    showAuthor,
    getTitle,
    getImage,
    getAltImage,
    getLead,
    getSection,
    getContent,
    getShowAuthor,
    imageFile,
    getImageFile,
  };
}
