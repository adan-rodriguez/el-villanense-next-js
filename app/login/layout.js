"use client";

import { redirect } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function LoginLayout({ children }) {
  const { user } = useContext(AuthContext);

  if (user) redirect("dashboard", "replace");

  return children;
}
