import { updateEmail, updatePassword } from "firebase/auth";
import { addAction, deleteAction, editAction } from "./server-actions";
import { auth } from "./config-firebase";

export const DOMAIN = "https://www.elvillanense.com.ar";

export const users = [
  {
    name: "Adán Rodríguez",
    fisrtName: "Adán",
    lastName: "Rodríguez",
    image:
      "https://res.cloudinary.com/dh4eh6jen/image/upload/v1684388470/el-villanense-redactores/adan-rodriguez-fondo-negro_inaek9.webp",
    nick: "adan-rodriguez",
    email: "adan.rodriguez.fusta@gmail.com",
    facebook: "https://www.facebook.com/adan.gabriel.rodriguez",
    gender: "male",
  },
  {
    name: "Selva Rodríguez",
    fisrtName: "Selva",
    lastName: "Rodríguez",
    image:
      "https://res.cloudinary.com/dh4eh6jen/image/upload/v1684388477/el-villanense-redactores/selva_bai6xh.webp",
    nick: "selva-rodriguez",
    email: "maselva@live.com.ar",
    facebook: "https://www.facebook.com/selva.rodriguez.73",
    gender: "female",
  },
  {
    name: "Germán Rodríguez",
    fisrtName: "Germán",
    lastName: "Rodríguez",
    image:
      "https://res.cloudinary.com/dh4eh6jen/image/upload/v1703888334/el-villanense-redactores/person-icon_itua0j.webp",
    nick: "german-rodriguez",
    email: "germanrodriguezfusta@hotmail.com",
    facebook: "https://www.facebook.com/german.rodriguez.75033149",
    gender: "male",
  },
];

export const socialMediaData = [
  {
    href: "https://www.facebook.com/elvillanense",
    title: "Seguinos en Facebook",
    src: "/icons/social/facebook.svg",
    alt: "Logo de Facebook",
  },
  {
    href: "https://www.instagram.com/el_villanense/?hl=es-la",
    title: "Seguinos en Instagram",
    src: "/icons/social/instagram.webp",
    alt: "Logo de Instagram",
  },
  {
    href: "https://x.com/Adan_Rodriguez_",
    title: "Seguinos en X",
    src: "/icons/social/twitter.webp",
    alt: "Logo de Twitter",
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
    document.body.inert = "true";
    try {
      await deleteAction({ articleId, nick });
      alert("Noticia eliminada con éxito");
    } catch {
      alert("No se ha podido eliminar la noticia");
    } finally {
      document.body.inert = "";
    }
  }
}

export const handleSubmitEditArticle = async ({
  e,
  router,
  articleId,
  article,
  imageFile,
  getLoading,
}) => {
  e.preventDefault();
  const $form = e.target;
  const $body = document.body;

  $form.inert = "true";
  $body.inert = "true";

  getLoading(true);

  try {
    if (imageFile) {
      const { imageUrl } = await uploadImage({ imageFile });
      article.image = imageUrl;
    }
    await editAction({ articleId, article });
  } catch {
    alert("Ocurrió un error. Inténtelo nuevamente");
    return;
  } finally {
    $form.inert = "";
    $body.inert = "";
    getLoading(false);
  }

  router.push(`/${articleId}`);
};

export const handleSubmitNewArticle = async ({
  e,
  router,
  article,
  imageFile,
  getLoading,
}) => {
  e.preventDefault();

  if (!imageFile) {
    alert("Sube una imagen!");
    return;
  }

  if (article.content === "") {
    alert("Escribe el cuerpo de la noticia!");
    return;
  }

  const $form = e.target;
  const $body = document.body;
  $form.inert = "true";
  $body.inert = "true";

  getLoading(true);

  let newArticle;

  try {
    const { imageUrl } = await uploadImage({ imageFile });
    article.image = imageUrl;

    newArticle = await addAction({ article });
  } catch {
    alert("Ocurrió un error. Inténtelo nuevamente");

    return;
  } finally {
    $form.inert = "";
    $body.inert = "";
    getLoading(false);
  }

  router.push(`/${newArticle.id}`);
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

export const handleFileChange = ({ e, getImageFile, getAltImage }) => {
  const file = e.target.files[0];

  handleFile({ file, getImageFile, getAltImage });
};

export const handleDropFile = ({ e, getImageFile, getAltImage }) => {
  e.preventDefault();

  const file = e.dataTransfer.files[0];

  handleFile({ file, getImageFile, getAltImage });
};

function handleFile({ file, getImageFile, getAltImage }) {
  if (!file) return;

  const fileTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];

  const { type: fileType } = file;

  if (!fileTypes.includes(fileType)) {
    alert(`No se acepta un archivo con formato '${fileType}'`);
    return;
  }

  getImageFile(file);
  getAltImage("");
}

export const selectSectionOptions = [
  { value: "", label: "--Seleccionar--" },
  { value: "locales", label: "Locales" },
  { value: "regionales", label: "Regionales" },
  { value: "provinciales", label: "Provinciales" },
  { value: "nacionales", label: "Nacionales" },
  { value: "internacionales", label: "Internacionales" },
];

export function handleChangeEmail({ e }) {
  e.preventDefault();
  if (confirm("¿Está seguro de cambiar su email?")) {
    updateEmail(auth.currentUser, e.target.email.value)
      .then(() => {
        alert("Email actualizado");
      })
      .catch(() => {
        alert("Ha ocurrido un error. No se pudo actualizar el email");
      });
  }
}

export function handleChangePassword({ e }) {
  e.preventDefault();
  if (confirm("¿Está seguro de cambiar su contraseña?")) {
    updatePassword(auth.currentUser, e.target.email.password)
      .then(() => {
        alert("Contraseña actualizada");
      })
      .catch(() => {
        alert("Ha ocurrido un error. No se pudo actualizar la contraseña");
      });
  }
}
