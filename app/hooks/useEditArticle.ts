import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Article } from "../lib/types";
import { useLoading } from "./useLoading";
import { useErrorMessage } from "./useErrorMessage";

export function useEditArticle(article: Article) {
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
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const { loading: loadingUpdateArticle, getLoading: getLoadingUpdateArticle } =
    useLoading();
  const { loading: loadingDeleteArticle, getLoading: getLoadingDeleteArticle } =
    useLoading();
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
  const getChangeImage = () => setChangeImage(true);

  useEffect(() => {
    setTitle(article.title);
    setLead(article.lead);
    setAltImage(article.altImage);
    setContent(article.content);
    setAuthors(article.authors);
  }, []);

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
    changeImage,
    getChangeImage,
    loadingUpdateArticle,
    getLoadingUpdateArticle,
    loadingDeleteArticle,
    getLoadingDeleteArticle,
    errorMessage,
    getErrorMessage,
    router,
  };
}
