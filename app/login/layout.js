"use client";

import { redirect } from "next/navigation";
import { routes } from "../lib/routes";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function LoginLayout({ children }) {
  const { user } = useContext(AuthContext);

  if (user) redirect(routes.dashboard.root, "replace");

  return children;
}
