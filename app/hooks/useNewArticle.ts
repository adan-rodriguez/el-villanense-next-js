import { useRouter } from "next/navigation";
import { useState } from "react";

export function useNewArticle() {
  const [title, setTitle] = useState("");
  const [altImage, setAltImage] = useState("");
  const [lead, setLead] = useState("");
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getTitle = (title: string) => setTitle(title);
  const getAltImage = (altImage: string) => setAltImage(altImage);
  const getLead = (lead: string) => setLead(lead);
  const getContent = (content: string) => setContent(content);
  const getAnonymous = (bool: boolean) => setAnonymous(bool);
  const getImageFile = (imageFile: File | null) => setImageFile(imageFile);
  const getLoading = (bool: boolean) => setLoading(bool);

  return {
    title,
    altImage,
    lead,
    content,
    anonymous,
    getTitle,
    getAltImage,
    getLead,
    getContent,
    getAnonymous,
    imageFile,
    getImageFile,
    loading,
    getLoading,
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
