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
  datetime.setUTCHours(datetime.getUTCHours() - 3);
  console.log(datetime);
  console.log(`${datetime}`);

  const formatter = new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  });
  const parts = formatter.formatToParts(datetime);

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

  console.log(`year: ${year}`);
  console.log(`month: ${month}`);
  console.log(`day: ${day}`);
  console.log(`hour: ${hour}`);
  console.log(`minute: ${minute}`);

  const datetimeAttribute = `${year}-${month}-${day}T${hour}:${minute}-03:00`;

  const dateContentFormatter = new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dateContent = dateContentFormatter.format(datetime);

  const timeFormatter = new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const time = timeFormatter.format(datetime);

  const datetimeContent = `${dateContent} - ${time}`;

  console.log(`datetimeAttribute: ${datetimeAttribute}`);
  console.log(`dateContent: ${dateContent}`);
  console.log(`datetimeContent: ${datetimeContent}`);

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
