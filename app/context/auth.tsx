"use client";

import { auth } from "@/app/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const AuthContext = createContext<{
  user: { name: string | null; image: string | null } | null;
}>({
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{
    name: string | null;
    image: string | null;
  } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        const { displayName, photoURL } = _user;
        setUser({ name: displayName, image: photoURL });
      } else {
        setUser(null);
        if (pathname.startsWith("/dashboard")) router.push("/login");

        // const customToken = await getCustomToken();

        // if (customToken) {
        //   await setPersistence(auth, browserSessionPersistence);
        //   await signInWithCustomToken(auth, customToken);
        //   return;
        // }
      }
    });

    // Limpieza del listener al desmontar
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
