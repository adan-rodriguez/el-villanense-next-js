import { useEffect, useState } from "react";

export default function useNewArticle({ user }) {
  const [title, setTitle] = useState("");
  const [altImage, setAltImage] = useState("");
  const [lead, setLead] = useState("");
  const [section, setSection] = useState("locales");
  const [content, setContent] = useState("");
  const [authors, setAuthors] = useState([]);
  const [anonymous, setAnonymous] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const getTitle = (title) => setTitle(title);
  const getAltImage = (altImage) => setAltImage(altImage);
  const getLead = (lead) => setLead(lead);
  const getSection = (section) => setSection(section);
  const getContent = (content) => setContent(content);
  const getAnonymous = (bool) => setAnonymous(bool);
  const getImageFile = (imageFile) => setImageFile(imageFile);

  useEffect(() => {
    setAuthors([user.nick]);
  }, []);

  return {
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
  };
}
