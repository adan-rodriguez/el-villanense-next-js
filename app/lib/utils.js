import { DOMAIN } from "./constants";
import { routes } from "./routes";

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
    String(datetime.getFullYear()),
    String(datetime.getMonth() + 1),
    String(datetime.getDate()),
    String(datetime.getHours()),
    String(datetime.getMinutes()),
  ];

  const monthString = [
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
  ][Number(month) - 1];

  const time = `${hour.length === 1 ? "0" : ""}${hour}:${
    minutes.length === 1 ? "0" : ""
  }${minutes}`; // 02:15

  const formattedDay = `${day.length === 1 ? "0" : ""}${day}`;

  const datetimeAttribute = `${year}-${
    month.length === 1 ? "0" : ""
  }${month}-${formattedDay}T${time}-03:00`; // 2023-12-22T02:15-03:00

  const dateContent = `${formattedDay} de ${monthString} de ${year}`; // 22 de Diciembre de 2023

  const datetimeContent = `${dateContent} - ${time}`; // 22 de Diciembre de 2023 - 02:15

  return { datetimeAttribute, dateContent, datetimeContent };
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export async function handleDelete({ articleId, router }) {
  if (confirm("¿Estás seguro de borrar esta noticia?")) {
    try {
      const response = await fetch(
        `${DOMAIN + routes.routes.articles.root + "/" + articleId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
    } catch {
      alert("No se ha podido eliminar la noticia");
      return;
    }

    alert("Noticia eliminada con éxito");

    router.refresh();
  }
}
