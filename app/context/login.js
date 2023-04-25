"use client";

import { auth } from "@/app/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user.email);
    }
  });

  return <LoginContext.Provider value={user}>{children}</LoginContext.Provider>;
}
