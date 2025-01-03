import { useEffect, useState } from "react";

export default function useMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }

    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return {
    isMenuOpen,
    getIsMenuOpen: (bool: boolean) => setIsMenuOpen(bool),
  };
}
