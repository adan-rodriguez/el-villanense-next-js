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
      console.log(window.innerWidth);
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
    getIsMenuOpen: (menuOpenState) => setIsMenuOpen(menuOpenState),
  };
}
