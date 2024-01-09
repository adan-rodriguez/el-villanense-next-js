import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./config-firebase";

export const login = async (e, { email, password, getLoginErrorMessage }) => {
  e.preventDefault();

  getLoginErrorMessage(null);

  e.target.inert = "true";

  setPersistence(auth, browserSessionPersistence).then(() => {
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        if (
          error.message.includes("user-not-found") ||
          error.message.includes("wrong-password")
        ) {
          getLoginErrorMessage("El email y/o contraseña son incorrectos");
        } else if (error.message.includes("invalid-email")) {
          getLoginErrorMessage("Introduce un email válido");
        } else {
          getLoginErrorMessage("Ocurrió un error. Inténtalo nuevamente");
        }
      })
      .finally(() => (e.target.inert = ""));
  });
};

export const logout = () => {
  signOut(auth)
    .then(() => {})
    .catch(() => {
      alert("No se ha podido cerrar sesión");
    });
};
