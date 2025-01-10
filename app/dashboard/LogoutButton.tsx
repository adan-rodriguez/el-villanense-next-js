"use client";

import { useLogout } from "../hooks/useLogout";
import { Button } from "../ui/components/Button";
import { LogoutIcon } from "../ui/components/Icons";

export function LogoutButton() {
  const { loading, logout } = useLogout();

  return (
    <Button
      type="button"
      style={{ display: "flex", padding: "5px" }}
      onClick={logout}
      disabled={loading}
    >
      <LogoutIcon />
    </Button>
  );
}
