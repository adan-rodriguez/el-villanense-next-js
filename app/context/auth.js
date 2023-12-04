"use client";

import { auth } from "@/app/lib/config-firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user.email);
    }
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
