import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Article } from "../lib/types";
import { useLoading } from "./useLoading";

export function useEditArticle(article: Article) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [altImage, setAltImage] = useState("");
  const [lead, setLead] = useState("");
  const [content, setContent] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { loading, getLoading } = useLoading();

  const router = useRouter();

  const getTitle = (title: string) => setTitle(title);
  const getImage = (image: string) => setImage(image);
  const getAltImage = (altImage: string) => setAltImage(altImage);
  const getLead = (lead: string) => setLead(lead);
  const getContent = (content: string) => setContent(content);
  const getAnonymous = (bool: boolean) => setAnonymous(bool);
  const getImageFile = (imageFile: File | null) => setImageFile(imageFile);

  useEffect(() => {
    // if (article) {
    setTitle(article.title);
    setImage(article.image);
    setAltImage(article.altImage);
    setLead(article.lead);
    setContent(article.content);
    setAuthors(article.authors);
    setAnonymous(article.anonymous);
    // }
  }, []);

  return {
    title,
    image,
    altImage,
    lead,
    content,
    authors,
    anonymous,
    getTitle,
    getImage,
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
