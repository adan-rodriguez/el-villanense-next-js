import { unstable_cache } from "next/cache";
import { addAction, deleteAction, editAction } from "./server-actions";
import { getArticles } from "./services/articles";
import { DOMAIN } from "./constants";

export const getCurrentYear = () => {
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  return currentYear;
};

export const getFriendlyUrl = ({ string }) => {
  const friendlyUrl = string
    .replace(/\s/g, "_")
    .toLowerCase()
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ó/g, "o")
    .replace(/ú/g, "u")
    .replace(/ñ/g, "n")
    .replace(/\W/g, "")
    .replace(/_/g, "-");

  return friendlyUrl;
};

export const timestampToDatetime = ({ timestamp }) => {
  const datetime1 = new Date(timestamp);
  const datetime2 = new Date(timestamp);
  datetime2.setUTCHours(datetime2.getUTCHours() - 3);
  // console.log(datetime1);
  // console.log(`${datetime1}`);
  // console.log(datetime2);
  // console.log(`${datetime2}`);

  const formatter = new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  });
  const parts = formatter.formatToParts(datetime1);

  const year = parts.find((part) => part.type === "year").value;
  const month = parts
    .find((part) => part.type === "month")
    .value.padStart(2, "0");
  const day = parts.find((part) => part.type === "day").value.padStart(2, "0");
  const hour = parts
    .find((part) => part.type === "hour")
    .value.padStart(2, "0");
  const minute = parts
    .find((part) => part.type === "minute")
    .value.padStart(2, "0");

  // console.log(`year: ${year}`);
  // console.log(`month: ${month}`);
  // console.log(`day: ${day}`);
  // console.log(`hour: ${hour}`);
  // console.log(`minute: ${minute}`);

  const datetimeAttribute = `${year}-${month}-${day}T${hour}:${minute}-03:00`;

  const dateContentFormatter = new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dateContent = dateContentFormatter.format(datetime2);

  const timeFormatter = new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const time = timeFormatter.format(datetime2);

  const datetimeContent = `${dateContent} - ${time}`;

  // console.log(`datetimeAttribute: ${datetimeAttribute}`);
  // console.log(`dateContent: ${dateContent}`);
  // console.log(`datetimeContent: ${datetimeContent}`);

  return { datetimeAttribute, dateContent, datetimeContent };
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export async function handleDelete({ articleId }) {
  if (confirm("¿Estás seguro de borrar esta noticia?")) {
    try {
      await deleteAction({ articleId });
    } catch {
      alert("No se ha podido eliminar la noticia");
      return;
    }

    alert("Noticia eliminada con éxito");
  }
}

export const handleSubmit = async (e, { articleId, article, imageFile }) => {
  e.preventDefault();

  e.target.inert = "true";

  try {
    if (imageFile) {
      const { imageUrl } = await uploadImage({ imageFile });
      article.image = imageUrl;
    }

    if (articleId) {
      await editAction({ articleId, article });

      alert("Artículo editado con éxito");
    } else {
      await addAction({ article });

      alert("Artículo subido con éxito");
    }
  } catch {
    alert("Ocurrió un error. Inténtelo nuevamente");
  }

  e.target.inert = "";
};

const uploadImage = async ({ imageFile }) => {
  let formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "elvillanense");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dh4eh6jen/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const { secure_url } = await response.json();
  return { imageUrl: secure_url };
};

export const getArticlesAndCache = unstable_cache(
  async ({ author } = {}) => await getArticles({ author }),
  ["articles"],
  {
    tags: ["articles"],
  }
);

export const getStructuredData = ({ article }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: article.image,
    datePublished: article.datetimeAttribute,
    ...(article.author && {
      author: {
        "@type": "Person",
        name: article.author,
        url:
          DOMAIN +
          "/" +
          article.author
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(" ", "-"),
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "El Villanense",
      logo: `${DOMAIN}/images/logo.png`,
    },
    url: DOMAIN + "/" + article.id,
  };

  return { structuredData };
};
