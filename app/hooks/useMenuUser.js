import { useState } from "react";

export default function useMenuUser() {
  const [isMenuUserOpen, setIsMenuUserOpen] = useState(false);

  return {
    isMenuUserOpen,
    getIsMenuUserOpen: (menuUserOpenState) =>
      setIsMenuUserOpen(menuUserOpenState),
  };
}
