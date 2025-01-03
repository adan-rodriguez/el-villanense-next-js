export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    src: "/icons/social/instagram.svg",
    alt: "Logo de Instagram",
  },
  {
    href: "https://x.com/Adan_Rodriguez_",
    title: "Seguinos en X",
    src: "/icons/social/x.png",
    alt: "Logo de X",
  },
];

export const getCurrentYear = () => {
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  return currentYear;
};

export const getFriendlyUrl = (string) => {
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

export const timestampToDatetime = (timestamp: number) => {
  const datetime1 = new Date(timestamp);
  const datetime2 = new Date(timestamp);
  datetime2.setUTCHours(datetime2.getUTCHours() - 3);

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

  return { datetimeAttribute, dateContent, datetimeContent };
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

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

export function isValidImageFile({
  file,
  allowedImageFileTypes,
}: {
  file: File | null;
  allowedImageFileTypes: string[];
}) {
  if (!file) return false;

  const { type } = file;

  if (!allowedImageFileTypes.includes(type)) {
    alert(`No se acepta un archivo con formato '${type}'`);
    return false;
  }

  return true;
}

export const selectSectionOptions = [
  { value: "", label: "--Seleccionar--" },
  { value: "locales", label: "Locales" },
  { value: "regionales", label: "Regionales" },
  { value: "provinciales", label: "Provinciales" },
  { value: "nacionales", label: "Nacionales" },
  { value: "internacionales", label: "Internacionales" },
];
