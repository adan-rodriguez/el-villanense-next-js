import { auth } from "@/app/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isUserLogged, setIsUserLogged] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }
  });

  return (
    <LoginContext.Provider value={isUserLogged}>
      {children}
    </LoginContext.Provider>
  );
}
