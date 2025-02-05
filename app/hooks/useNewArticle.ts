import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLoading } from "./useLoading";
import { useErrorMessage } from "./useErrorMessage";

export function useNewArticle(author: {
  id: string;
  nick: string;
  name: string;
  image: string | null;
  anonymous: boolean;
}) {
  const [title, setTitle] = useState("");
  const [altImage, setAltImage] = useState("");
  const [lead, setLead] = useState("");
  const [content, setContent] = useState("");
  const [authors, setAuthors] = useState<
    {
      id: string;
      nick: string;
      name: string;
      image: string | null;
      anonymous: boolean;
    }[]
  >([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();
  const router = useRouter();

  const getTitle = (title: string) => setTitle(title);
  const getAltImage = (altImage: string) => setAltImage(altImage);
  const getLead = (lead: string) => setLead(lead);
  const getContent = (content: string) => setContent(content);
  const getAuthors = (
    authors: {
      id: string;
      nick: string;
      name: string;
      image: string | null;
      anonymous: boolean;
    }[]
  ) => setAuthors(authors);
  const getImageFile = (imageFile: File | null) => setImageFile(imageFile);

  useEffect(() => setAuthors([author]), []);

  return {
    title,
    getTitle,
    lead,
    getLead,
    altImage,
    getAltImage,
    content,
    getContent,
    authors,
    getAuthors,
    imageFile,
    getImageFile,
    loading,
    getLoading,
    errorMessage,
    getErrorMessage,
    router,
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
