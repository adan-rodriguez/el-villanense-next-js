"use client";

import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from "../firebase/firebase";

export const loginContext = createContext();

export default function LayoutLoginAdmin({ children }) {
  const [isUserLogged, setIsUserLogged] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }
  });

  return (
    <loginContext.Provider value={isUserLogged}>
      {children}
    </loginContext.Provider>
  );
}
