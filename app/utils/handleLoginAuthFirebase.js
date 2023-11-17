import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { redirect } from "next/navigation";

export const handleLoginAuthFirebase = (
  email,
  password,
  setLoginErrorMessage
) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => redirect("/dashboard"))
        .catch((error) => {
          if (
            error.message.includes("user-not-found") ||
            error.message.includes("wrong-password")
          ) {
            setLoginErrorMessage("El email y/o contraseña son incorrectos");
          } else {
            setLoginErrorMessage("Ocurrió un error. Inténtalo nuevamente");
          }
        });
    })
    .catch(() => {
      setLoginErrorMessage("Ocurrió un error. Inténtalo nuevamente");
    });
};
