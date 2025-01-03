import { useState } from "react";

export function useLoading() {
  const [loading, setLoading] = useState<boolean>(false);

  const getLoading = (bool: boolean) => setLoading(bool);

  return {
    loading,
    getLoading,
  };
}
