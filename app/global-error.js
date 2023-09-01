"use client";

// import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  // useEffect(() => {
  //   console.error(error);
  // }, [error]);

  return (
    <html>
      <body>
        <h2>Error</h2>
        <button onClick={() => reset()}>Recargar página</button>
      </body>
    </html>
  );
}
