import { useState } from "react";

export function useUserMenu() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return {
    isUserMenuOpen,
    getIsUserMenuOpen: (userMenuOpenState: boolean) =>
      setIsUserMenuOpen(userMenuOpenState),
  };
}
