"use client";

import { auth } from "@/app/lib/config-firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { users } from "../lib/users";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const editor = users.find((_user) => _user.email === user.email);
      // window.sessionStorage.setItem("author", JSON.stringify(editor));
      setUser(editor);
    }
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
