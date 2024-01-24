"use client";

import { AuthContext } from "@/app/context/auth";
import useSignup from "@/app/hooks/useSignup";
import { SUPER_ADMINS } from "@/app/lib/utils";
import SignupForm from "@/app/ui/components/SignupForm";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function SignupPage() {
  const { user } = useContext(AuthContext);

  if (!SUPER_ADMINS.includes(user.email)) {
    redirect("/dashboard", "replace");
  }

  const { signupErrorMessage, getSignupErrorMessage, loading, getLoading } =
    useSignup();

  return (
    <SignupForm
      signupErrorMessage={signupErrorMessage}
      getSignupErrorMessage={getSignupErrorMessage}
      loading={loading}
      getLoading={getLoading}
    />
  );
}
