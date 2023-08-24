"use client";

import useLogin from "../hooks/useLogin";

export default function Layout({ dashboard, login }) {
  const { user } = useLogin();
  return user ? dashboard : login;
}
