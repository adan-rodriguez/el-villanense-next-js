export const timestampToDatetime = (timestamp) => {
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

  const objectDatetime = {
    datetimeAttribute: `${year}-${
      String(month).length === 1 ? 0 : ""
    }${month}-${String(day).length === 1 ? 0 : ""}${day}T${
      String(hour).length === 1 ? 0 : ""
    }${hour}:${String(minutes).length === 1 ? 0 : ""}${minutes}-03:00`,
    dateContent: `${
      String(day).length === 1 ? 0 : ""
    }${day} de ${monthString} de ${year}`,
    datetimeContent: `${
      String(day).length === 1 ? 0 : ""
    }${day} de ${monthString} de ${year} - ${
      String(hour).length === 1 ? 0 : ""
    }${hour}:${String(minutes).length === 1 ? 0 : ""}${minutes}`,
  };

  return objectDatetime;
};
