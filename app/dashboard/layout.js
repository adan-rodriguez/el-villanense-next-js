"use client";

import { redirect } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function DashboardLayout({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) redirect("/login", "replace");

  return children;
}
