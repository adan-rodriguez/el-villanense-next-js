"use client";

import { redirect } from "next/navigation";
import useLogin from "../hooks/useLogin";
import { routes } from "../lib/routes";

export default function DashboardLayout({ children }) {
  const { user } = useLogin();
  if (!user) redirect(routes.login.root);
  return children;
}
