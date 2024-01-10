"use client";

import { AuthContext } from "@/app/context/auth";
import { routes } from "@/app/lib/routes";
import SignupForm from "@/app/ui/components/SignupForm";
import styles from "@/app/ui/styles/SignupPage.module.css";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function SignupPage() {
  const { user } = useContext(AuthContext);

  if (user.email !== "adan.rodriguez.fusta@gmail.com") {
    redirect(routes.dashboard.root, "replace");
  }

  return (
    <>
      <h2 className={styles.title}>Crear usuario</h2>
      <SignupForm />
    </>
  );
}
