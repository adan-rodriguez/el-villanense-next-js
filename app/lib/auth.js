import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./config-firebase";

export const handleLogin = ({ email, password }) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          return null;
        })
        .catch((error) => {
          if (
            error.message.includes("user-not-found") ||
            error.message.includes("wrong-password")
          ) {
            return "El email y/o contraseña son incorrectos";
          } else {
            return "Ocurrió un error. Inténtalo nuevamente";
          }
        });
    })
    .catch(() => {
      return "Ocurrió un error. Inténtalo nuevamente";
    });
};
