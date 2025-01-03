"use client";

import { auth } from "@/app/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { getAuthor } from "../lib/services/client/authors";
import { Author } from "../lib/types";

export const AuthContext = createContext<{ user: Author | null }>({
  user: null,
});

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<Author | null>(null);

  onAuthStateChanged(auth, async (_user) => {
    if (_user) {
      try {
        const user = await getAuthor(_user.uid);
        setUser(user);
      } catch (error) {
        setUser(null);
      }
      return;
    }

    setUser(null);
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
