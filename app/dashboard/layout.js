"use client";

import { redirect } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { routes } from "../lib/routes";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();

  if (!user) redirect(routes.login.root, "replace");

  return children;
}
