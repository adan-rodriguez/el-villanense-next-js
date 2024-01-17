import { unstable_cache } from "next/cache";
import { addAction, deleteAction, editAction } from "./server-actions";
import { getArticles } from "./services/articles";

export const DOMAIN = "https://www.elvillanense.com.ar";

export const users = [
  {
    name: "Adán Rodríguez",
    image:
      "https://res.cloudinary.com/dh4eh6jen/image/upload/v1684388470/el-villanense-redactores/adan-rodriguez-fondo-negro_inaek9.webp",
    nick: "adan-rodriguez",
    email: "adan.rodriguez.fusta@gmail.com",
  },
  {
    name: "Selva Rodríguez",
    image:
      "https://res.cloudinary.com/dh4eh6jen/image/upload/v1684388477/el-villanense-redactores/selva_bai6xh.webp",
    nick: "selva-rodriguez",
    email: "maselva@live.com.ar",
  },
  {
    name: "Germán Rodríguez",
    image:
      "https://res.cloudinary.com/dh4eh6jen/image/upload/v1703888334/el-villanense-redactores/person-icon_itua0j.webp",
    nick: "german-rodriguez",
    email: "germanrodriguezfusta@hotmail.com",
  },
];

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

export async function handleDelete({ articleId, nick }) {
  if (confirm("¿Estás seguro de borrar esta noticia?")) {
    try {
      await deleteAction({ articleId, nick });
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

  // const articlesDraft = JSON.parse(window.localStorage.getItem("draft"));
  // articlesDraft.shift();
  // window.localStorage.setItem("draft", JSON.stringify(articlesDraft));

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

export const handleSubmitEditArticle = async (
  e,
  { articleId, article, imageFile }
) => {
  e.preventDefault();

  e.target.inert = "true";

  try {
    if (imageFile) {
      const { imageUrl } = await uploadImage({ imageFile });
      article.image = imageUrl;
    }
    await editAction({ articleId, article });
    alert("Artículo editado con éxito");
  } catch {
    alert("Ocurrió un error. Inténtelo nuevamente");
  }

  e.target.inert = "";
};

export const handleSubmitNewArticle = async (e, { article, imageFile }) => {
  e.preventDefault();
  e.target.inert = "true";

  let newArticle;

  try {
    const { imageUrl } = await uploadImage({ imageFile });
    article.image = imageUrl;

    newArticle = await addAction({ article });
    alert("Artículo subido con éxito");
  } catch {
    alert("Ocurrió un error. Inténtelo nuevamente");
  }

  e.target.inert = "";
  return newArticle;
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

export const SUPER_ADMINS = ["adan.rodriguez.fusta@gmail.com"];

export function objCompare(obj1, obj2) {
  const Obj1_keys = Object.keys(obj1);
  const Obj2_keys = Object.keys(obj2);
  if (Obj1_keys.length !== Obj2_keys.length) {
    return false;
  }
  for (let k of Obj1_keys) {
    if (obj1[k] !== obj2[k]) {
      return false;
    }
  }
  return true;
}
