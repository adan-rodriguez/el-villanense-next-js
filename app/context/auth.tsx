"use client";

import { auth } from "@/app/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getAuthor } from "../lib/services/client/authors";
import { Author } from "../lib/types";

export const AuthContext = createContext<{ user: Author | null }>({
  user: null,
});

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<Author | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        try {
          const user = await getAuthor(_user.uid);
          setUser(user);
        } catch (error) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    // Limpieza del listener al desmontar
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
