import { useEffect, useState } from "react";

export default function useNewArticle({ user }) {
  const [title, setTitle] = useState("");
  const [altImage, setAltImage] = useState("");
  const [lead, setLead] = useState("");
  const [section, setSection] = useState(null);
  const [content, setContent] = useState("");
  const [authors, setAuthors] = useState([]);
  const [anonymous, setAnonymous] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTitle = (title) => setTitle(title);
  const getAltImage = (altImage) => setAltImage(altImage);
  const getLead = (lead) => setLead(lead);
  const getSection = (section) => setSection(section);
  const getContent = (content) => setContent(content);
  const getAnonymous = (bool) => setAnonymous(bool);
  const getImageFile = (imageFile) => setImageFile(imageFile);
  const getLoading = (bool) => setLoading(bool);

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
    loading,
    getLoading,
  };
}

// const ref = useRef(true);
// const firstRender = ref.current;
// ref.current = false;

// useEffect(() => {
//   const articles = JSON.parse(window.localStorage.getItem("draft")) ?? [];

//   articles.unshift({
//     title,
//     image,
//     altImage,
//     lead,
//     section,
//     content,
//     author,
//     showAuthor,
//   });
//   console.log(firstRender);

//   if (!firstRender) {
//     articles.splice(1, 1);
//   }

//   window.localStorage.setItem("draft", JSON.stringify(articles));
// }, [title, image, altImage, lead, section, content, author, showAuthor]);
