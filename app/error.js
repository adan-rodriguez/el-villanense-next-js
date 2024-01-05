"use client";

// import { useEffect } from "react";

export default function Error({ /* error */ reset }) {
  // useEffect(() => {
  //   console.error(error);
  // }, [error]);

  return (
    <div>
      <h2>Error</h2>
      <button onClick={() => reset()}>Recargar página</button>
    </div>
  );
}
