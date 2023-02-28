"use client";

import { auth } from "@/app/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, /* useEffect, */ useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isUserLogged, setIsUserLogged] = useState(false);

  // useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    console.log("a");
    if (user) {
      console.log("b");
      setIsUserLogged(true);
    } else {
      console.log("c");
      setIsUserLogged(false);
    }
  });
  // });

  return (
    <LoginContext.Provider value={isUserLogged}>
      {children}
    </LoginContext.Provider>
  );
}
