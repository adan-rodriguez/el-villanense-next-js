import { useState } from "react";

export default function useUserMenu() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return {
    isUserMenuOpen,
    getIsUserMenuOpen: (userMenuOpenState) =>
      setIsUserMenuOpen(userMenuOpenState),
  };
}
