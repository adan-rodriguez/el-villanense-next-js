"use client";

import { redirect } from "next/navigation";
import useLogin from "../hooks/useLogin";

export default function DashboardLayout({ children }) {
  const { user } = useLogin();
  if (!user) redirect("/login");
  return children;
}
