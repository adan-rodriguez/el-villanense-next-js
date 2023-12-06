import { DOMAIN } from "./constants";
import { deleteArticle } from "./services/articles";

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
  const datetime = new Date(timestamp);

  const [year, month, day, hour, minutes] = [
    datetime.getFullYear(),
    datetime.getMonth(),
    datetime.getDate(),
    datetime.getHours(),
    datetime.getMinutes(),
  ];

  const getMonth = (n) => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return months[n];
  };

  const monthString = getMonth(month);

  const datetimeAttribute = `${year}-${
    String(month).length === 1 ? 0 : ""
  }${month}-${String(day).length === 1 ? 0 : ""}${day}T${
    String(hour).length === 1 ? 0 : ""
  }${hour}:${String(minutes).length === 1 ? 0 : ""}${minutes}-03:00`;

  const dateContent = `${
    String(day).length === 1 ? 0 : ""
  }${day} de ${monthString} de ${year}`;

  const datetimeContent = `${
    String(day).length === 1 ? 0 : ""
  }${day} de ${monthString} de ${year} - ${
    String(hour).length === 1 ? 0 : ""
  }${hour}:${String(minutes).length === 1 ? 0 : ""}${minutes}`;

  return { datetimeAttribute, dateContent, datetimeContent };
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export async function handleDelete({ articleId, router }) {
  if (confirm("¿Estás seguro de borrar esta noticia?")) {
    try {
      await deleteArticle({ articleId });
      const response = await fetch(`${DOMAIN}/articles/${articleId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
    } catch {
      alert("No se ha podido eliminar la noticia");
      return;
    }

    alert("Noticia eliminada con éxito");

    router.refresh();
  }
}
