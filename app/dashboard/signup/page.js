"use client";

import { AuthContext } from "@/app/context/auth";
import { SUPER_ADMINS } from "@/app/lib/utils";
import SignupForm from "@/app/ui/components/SignupForm";
import styles from "@/app/ui/styles/SignupPage.module.css";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function SignupPage() {
  const { user } = useContext(AuthContext);

  if (!SUPER_ADMINS.includes(user.email)) {
    redirect("/dashboard", "replace");
  }

  return (
    <>
      <h2 className={styles.title}>Crear usuario</h2>
      <SignupForm />
    </>
  );
}
