"use client";

import { auth } from "@/app/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { users } from "../lib/utils";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userFirebase, setUserFirebase] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const editor = users.find((_user) => _user.email === user.email);
      setUser(editor);
      setUserFirebase(user);
    } else {
      setUser(null);
      setUserFirebase(null);
    }
  });

  return (
    <AuthContext.Provider value={{ user, userFirebase }}>
      {children}
    </AuthContext.Provider>
  );
}
