"use client";

import { redirect } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { routes } from "../lib/routes";

export default function LoginLayout({ children }) {
  const { user } = useAuth();

  if (user) redirect(routes.dashboard.root, "replace");

  return children;
}
