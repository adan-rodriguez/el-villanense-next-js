import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const handleLoginAuthFirebase = (
  email,
  password,
  setLoginErrorMessage
) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
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
